import { sql } from '../db/db';
import { ItemInsert, ItemSelect, ItemUpdate } from '../types';
import { DbError, DbErrorType } from '../utilities/DbError';

const syncProperties = async (category: string, newProperties: Record<string, any>) => {
	try {
		const existingCategoryItem = await sql`
            select properties
            from items
            where category = ${category}
            limit 1`;

		if (existingCategoryItem.length == 0) {
			console.log(`no preexisting items of category ${category}`);
			return;
		}

		// Handle the case where properties is an array
		const existingProps = Array.isArray(existingCategoryItem[0].properties)
			? JSON.parse(existingCategoryItem[0].properties[0])
			: existingCategoryItem[0].properties;

		const existingKeys = Object.keys(existingProps);
		const newKeys = Object.keys(newProperties);
		const newlyAddedKeys = newKeys.filter(key => !existingKeys.includes(key));
		const keysToRemove = existingKeys.filter(key => !newKeys.includes(key));

		if (newlyAddedKeys.length > 0 || keysToRemove.length > 0) {
			const nullProps = newlyAddedKeys.reduce((acc, key) => {
				acc[key] = null;
				return acc;
			}, {} as Record<string, any>);

			const propertySync = await sql`
                UPDATE items
                SET properties = COALESCE(
                    CASE
                        WHEN jsonb_typeof(properties) = 'array'
                        THEN (properties->0)::jsonb
                        ELSE properties
                    END || ${sql.json(nullProps)}::jsonb - ${sql.array(keysToRemove)}::text[],
                    ${sql.json(nullProps)}::jsonb
                )
                WHERE category = ${category}
                RETURNING properties`;

			if (propertySync.length == 0) {
				throw new DbError(`failed to sync properties across category type`, DbErrorType.DataIntegrityViolation);
			}
		}

		return newProperties;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const selectItemById = async (id: number) => {
	try {
		const item = await sql`
		select *
		from items
		where id = ${id}
		`;

		if (item.length == 0) {
			throw new DbError(`item of id: ${id} not found`, DbErrorType.MissingRecord)
		}

		return item[0] as ItemSelect;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const selectItems = async () => {
	try {
		const items = await sql`
		select *
		from items
		order by id
		`;

		return items
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const deleteItemById = async (id: number) => {
	try {
		await selectItemById(id);

		const item = await sql`
		delete from items
		where id = ${id}
		returning *;
		`;

		if (item.length == 0) {
			console.log(item)
			throw new DbError(`deletion of item with if ${id} failed`, DbErrorType.ServerError)
		}

		return item;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const insertItem = async (itemInsert: ItemInsert) => {
	try {
		let { name, category, properties } = itemInsert;
		const item = await sql`
            insert into items (name, category, properties)
            values (
                ${name},
                ${category},
                ${sql.json(properties)}::jsonb
            )
            returning *
        `;

		if (item.length == 0) {
			throw new DbError(`item insert failed`, DbErrorType.ServerError)
		}

		await syncProperties(category, properties);

		return item;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const updateItemById = async (id: number, itemUpdate: ItemUpdate) => {
	try {
		const currentItem = await selectItemById(id);
		const updates = Object.entries(itemUpdate).reduce((acc, [key, value]) => {
			acc[key] = value;  // Remove the JSON.stringify
			return acc;
		}, {} as Record<string, any>);

		const updateResult = await sql`
            UPDATE items
            SET ${sql(updates)}
            WHERE id = ${id}
            RETURNING *`;

		if (updateResult.length === 0) {
			throw new DbError(`updating item of id: ${id} failed`, DbErrorType.ServerError);
		}

		if (itemUpdate.properties) {
			await syncProperties(currentItem.category, itemUpdate.properties);
		}

		return updateResult[0];
	} catch (err) {
		console.error(err);
		throw err;
	}
};


export { selectItemById, selectItems, deleteItemById, insertItem, updateItemById }

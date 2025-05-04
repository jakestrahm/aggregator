import { sql } from '../db/db';
import { ItemInsert, ItemUpdate } from '../types';
import { DbError, DbErrorType } from '../utilities/DbError';

const selectItemById = async (id: number) => {
	try {
		const items = await sql`
		  select
			i.id as item_id,
			i.name,
			i.item_type,
			coalesce(jsonb_object_agg(ip.property_name, ip.property_value)
			  filter (where ip.property_name is not null), '{}'::jsonb) as properties
		  from items i
		  left join item_properties ip on i.id = ip.item_id
		  where i.id = ${id}
		  group by i.id;
		`;

		if (items.length === 0) {
			throw new DbError(`item of id: ${id} not found`, DbErrorType.MissingRecord);
		}

		const { properties, ...item } = items[0];

		return {
			...item,
			...properties
		};
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const selectItems = async () => {
	try {
		const items = await sql`
      select
        i.id as item_id,
        i.name,
        i.item_type,
        coalesce(jsonb_object_agg(ip.property_name, ip.property_value)
          filter (where ip.property_name is not null), '{}'::jsonb) as properties
      from items i
      left join item_properties ip on i.id = ip.item_id
      group by i.id
      order by i.id;
    `;

		return items.map(({ properties, ...item }) => ({
			...item,
			...properties
		}));
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const deleteItemById = async (id: number) => {
	try {
		// check if the item exists before attempting to delete
		const item = await selectItemById(id);

		// delete the item
		const deletedItem = await sql`
      delete from items
      where id = ${id}
      returning *;
    `;

		if (deletedItem.length === 0) {
			throw new DbError(`deletion of item with id ${id} failed`, DbErrorType.ServerError);
		}

		return { ...item }; // return the original item with its properties
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const insertItem = async (itemInsert: ItemInsert) => {
	const { name, item_type, properties = [] } = itemInsert; // ensure properties is an array

	try {
		return await sql.begin(async (sql) => {
			const insertedItem = await sql`
				insert into items (name, item_type)
				values (${name}, ${item_type})
				returning id;`;

			if (insertedItem.length === 0) {
				throw new DbError(`failed to insert item`, DbErrorType.ServerError);
			}

			const itemId = insertedItem[0].id;

			if (Array.isArray(properties) && properties.length > 0) {
				const propertyTuples = properties.map(({ property_name, property_value }) => [
					itemId,
					property_name,
					property_value,
				]);

				await sql`
				  insert into item_properties (item_id, property_name, property_value)
				  values ${sql(propertyTuples)};
				`;
			}

			return itemId;
		});

	} catch (err) {
		console.error(err);
		throw err;
	}
};
const updateItemById = async (id: number, itemUpdate: ItemUpdate) => {
	try {
		const existingItem = await selectItemById(id);
		if (existingItem.length == 0) {
			throw new DbError(`item of id: ${id} not found`, DbErrorType.MissingRecord);
		}
		const {
			name = itemUpdate.name || existingItem.name,
			item_type = itemUpdate.item_type || existingItem.item_type,
			properties = existingItem.properties
		} = itemUpdate;

		return await sql.begin(async (sql) => {

			const updatedItem = await sql`
				update items
				set
					name = ${name},
					item_type = ${item_type}
					where id = ${id}
					returning id;`

			if (updatedItem.length == 0) {
				throw new DbError(`update of item with id ${id} failed`, DbErrorType.ServerError)
			}


			if (Array.isArray(properties)) {
				// clear out old item_properties
				await sql`
                    DELETE FROM item_properties
                    WHERE item_id = ${id};
                `;

				//insert new set
				if (properties.length > 0) {
					const propertyTuples = properties.map(({ property_name, property_value }) => [
						id,
						property_name,
						property_value,
					]);

					await sql`
                        INSERT INTO item_properties (item_id, property_name, property_value)
                        VALUES ${sql(propertyTuples)};
                    `;
				}
			}

			return id;
		});

	} catch (err) {
		console.error(err);
		throw err;
	}
};


export { selectItemById, selectItems, deleteItemById, insertItem, updateItemById }

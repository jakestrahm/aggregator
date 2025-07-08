import { baseApi } from "./baseApi";

export interface User {
	id: number,
	email: string,
	username: string,
	created_at: string
}

export interface UserInsert {
	username: string
	email: string
	password: string
}

export interface UserUpdate {
	username?: string
	email?: string
}

export const userApi = baseApi.injectEndpoints({

	endpoints: (builder) => ({

		register: builder.mutation<User, UserInsert>({
			query: (user) => ({
				url: 'users/register',
				method: 'POST',
				body: user
			}),
			invalidatesTags: ['User']
		}),

		findUser: builder.query<User, number>({
			query: (id) => `users/${id}`,
			providesTags: (result, error, arg) => [{ type: 'User', id: arg }]

		}),

		listUsers: builder.query<User[], void>({
			query: () => ({
				url: 'users',
				method: 'GET'
			}),
			providesTags: (result = [], error, arg) => [
				'User',
				...result.map(({ id }) => ({ type: 'User', id }) as const)
			]
		}),

		editUser: builder.mutation<User, UserUpdate & { id: number }>({
			query: (data) => ({
				url: `users/${data.id}`,
				method: 'PUT',
				body: {
					email: data?.email,
					username: data?.username,
				}
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]

		}),

		deleteUser: builder.mutation<User, number>({
			query: (id) => ({
				url: `users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [{ type: 'User', id }]
		})

	})
})

export const {
	useFindUserQuery,
	useListUsersQuery,
	useRegisterMutation,
	useEditUserMutation,
	useDeleteUserMutation,
} = userApi

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

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

export const userApi = createApi({
	reducerPath: 'users',
	baseQuery,
	endpoints: (builder) => ({
		register: builder.mutation<User, UserInsert>({
			query: (user) => ({
				url: 'users/register',
				method: 'POST',
				body: user
			})
		}),
		getUserById: builder.query<User, number>({
			query: (id) => `users/${id}`,
		}),
		getUsers: builder.query<User[], null>({
			query: () => `users`
		})
	})
})

export const { useGetUserByIdQuery, useGetUsersQuery, useRegisterMutation } = userApi

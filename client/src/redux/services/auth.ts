import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface LoginResponse {
	user: object
	token: string
}

export interface LoginRequest {
	email: string
	password: string
}

export const authApi = createApi({
	//api name- prefix in path www.x.com/authApi/login
	reducerPath: 'authApi',

	//includes base url e.g. www.x.com
	baseQuery,

	//define the endpoints for this path authApi/login, authApi/x, etc
	endpoints: (builder) => ({

		//mutation for operations other than reads
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'users/login',
				method: 'POST',
				body: credentials
			}),
		}),
		//TODO should this be middleware?
		protected: builder.mutation<{ message: string }, void>({
			query: () => 'protected'
		})
	})
})

export const { useLoginMutation, useProtectedMutation } = authApi

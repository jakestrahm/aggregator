import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
//todo get in codegen rtk query
//learn about tags + caching
//using tags to automatically refresh

export interface LoginResponse {
	user: object
	token: string
}

export interface LoginRequest {
	email: string
	password: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery,
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'users/login',
				method: 'POST',
				body: credentials
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => 'protected'
		})
	})
})

export const { useLoginMutation, useProtectedMutation } = authApi

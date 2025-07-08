import { baseApi } from "./baseApi";

export interface LoginResponse {
	user: object
	token: string
}

export interface LoginRequest {
	email: string
	password: string
}

export const authApi = baseApi.injectEndpoints({
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

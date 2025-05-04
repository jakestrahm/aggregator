import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3000/',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token
		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}

		const profiling = (getState() as RootState).profiling.status

		if (profiling) {
			headers.set(`Profile-Request`, `true`)
		}
		return headers
	},
});

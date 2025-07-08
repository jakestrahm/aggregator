import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
	//define the path e.g. api/users
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['User'],
	endpoints: () => ({
	})
})

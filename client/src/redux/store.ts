import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import profilingReducer from './slices/profilingSlice'
import { authApi } from './services/auth'
import { userApi } from './services/users'

export const store = configureStore({
	reducer: {
		profiling: profilingReducer,
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware)
})

// infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// infer the `appdispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>

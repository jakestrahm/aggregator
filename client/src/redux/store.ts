import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'       // Handles authentication state
import profilingReducer from './slices/profilingSlice'  // Handles profiling state
import { authApi } from './services/auth'  // API for authentication operations
import { userApi } from './services/users' // API for user-related operations

export const store = configureStore({

	// reducer field combines all reducers into the root reducer
	reducer: {

		// reducers
		profiling: profilingReducer,
		auth: authReducer,

		// slice reducers
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		//get default middleware (rtkq features e.g. caching, invalidation, etc)
		getDefaultMiddleware()
			// add the rtk query middleware for both api slices
			.concat(authApi.middleware)
			.concat(userApi.middleware)
})

//-- TYPE DEFINITIONS FOR LSP SUPPORT/TYPE SAFETY --\\
// state type (shape of entire redux state tree)
export type RootState = ReturnType<AppStore['getState']>
// store type based off my created store
export type AppStore = typeof store
// dispatch type that is based off my store def (with my middleware, etc)
export type AppDispatch = AppStore['dispatch']
// a "thunk function" type
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type AuthState = {
	user: object | null
	token: string | null
}

const slice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null } as AuthState,
	reducers: {
		setCredentials: (
			state,
			{
				payload: { user, token },
			}: PayloadAction<{ user: object; token: string }>,
		) => {
			state.user = user
			state.token = token
		},
		Logout: (state) => {
			state.user = null
			state.token = null
		}
	},
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user

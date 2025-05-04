import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// def for slice's state shape
export interface AuthState {
	user: object | null
	token: string | null
}

export const authSlice = createSlice({
	//slice name- prefix for actions e.g. auth/setCredentials
	name: 'auth',
	initialState: { user: null, token: null } as AuthState,
	reducers: {
		setCredentials: (
			state,
			{ payload: { user, token } }: PayloadAction<AuthState>,
		) => {
			state.user = user
			state.token = token
		},

		logout: (state) => {
			state.user = null
			state.token = null
		}
	},

	selectors: {
		selectUser: state => state.user,
		selectToken: state => state.token

	}
})

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
export const { selectUser, selectToken } = authSlice.selectors;

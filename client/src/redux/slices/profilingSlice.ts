import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfilingState {
	status: 'enabled' | 'disabled'
	data: object | null

};

const initialState: ProfilingState = {
	status: 'disabled',
	data: null
};

export const profilingSlice = createSlice({
	name: 'profiling',
	initialState,
	reducers: {
		enableProfiling: state => {
			state.status = 'enabled'
		},
		disableProfiling: state => {
			state.status = 'disabled'
		},
		setProfilingData: (state, action: PayloadAction<Object>) => {
			state.data = action.payload;
		}
	},

	selectors: {
		selectProfilingStatus: state => state.status,
		selectProfilingData: state => state.data
	}
});

export default profilingSlice.reducer;
export const { enableProfiling, disableProfiling, setProfilingData } = profilingSlice.actions
export const { selectProfilingStatus, selectProfilingData } = profilingSlice.selectors;

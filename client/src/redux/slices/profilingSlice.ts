import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// def for slice's state shape
export interface ProfilingState {
	status: 'enabled' | 'disabled'
	data: object | null

};

export const profilingSlice = createSlice({
	//slice name- prefix for actions e.g. profiling/enableProfiling
	name: 'profiling',
	initialState: { status: 'disabled', data: null } as ProfilingState,

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

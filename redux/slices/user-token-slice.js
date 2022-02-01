import { createSlice } from '@reduxjs/toolkit';

export const userTokenSlice = createSlice({
	name: 'counter',
	initialState: {
		value: "none",
	},
	reducers: {
		setToken: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setToken } = userTokenSlice.actions;

export default userTokenSlice.reducer;
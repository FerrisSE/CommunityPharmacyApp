import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		meds: [],
	},
	reducers: {
		addMed: (state, action) => {
			if (!state.meds.some(m => m.medicationName == action.payload.medicationName))
				state.meds.push(action.payload);
		},
		removeMed: (state, action) => {
			state.meds = state.meds.filter(m => m.medicationName != action.payload.medicationName);
		}
	},
});

export const { addMed, removeMed } = cartSlice.actions;

export default cartSlice.reducer;
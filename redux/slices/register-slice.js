import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
	name: 'register',
	initialState: {
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		password: "",
	},
	reducers: {
		clearData: (state) => {
			state.firstName = "";
			state.middleName = "";
			state.lastName = "";
			state.email = "";
			state.password = "";
		},
		setFirstName: (state, action) => {
			state.firstName = action.payload;
		},
		setMiddleName: (state, action) => {
			state.middleName = action.payload;
		},
		setLastName: (state, action) => {
			state.lastName = action.payload;
		},
		setBirthDate: (state, action) => {
			state.birthDate = action.payload;
		},
		setPhone: (state, action) => {
			state.phone = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
	},
});

export const { clearData, setFirstName, setMiddleName, setLastName, setEmail, setPassword } = registerSlice.actions;

export default registerSlice.reducer;
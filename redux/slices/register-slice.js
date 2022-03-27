import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
	name: 'register',
	initialState: {
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		password: "",
		pharmacy: -1,
	},
	reducers: {
		clearData: (state) => {
			state.firstName = "";
			state.middleName = "";
			state.lastName = "";
			state.email = "";
			state.password = "";
			state.pharmacy = -1;
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
		setPharmacy: (state, action) => {
			state.pharmacy = action.payload;
		}
	},
});

export const { clearData, setFirstName, setMiddleName, setLastName, setEmail, setPassword, setPharmacy } = registerSlice.actions;

export default registerSlice.reducer;
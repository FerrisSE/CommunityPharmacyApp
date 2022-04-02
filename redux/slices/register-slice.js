import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
	name: 'register',
	initialState: {
		email: "",
		password: "",
		firstName: "",
		middleName: "",
		lastName: "",
		address: "",
		phoneNumber: "",
		birthDate: "",
		pharmacy: -1,
	},
	reducers: {
		clearData: (state) => {
			state.email = "";
			state.password = "";
			state.firstName = "";
			state.middleName = "";
			state.lastName = "";
			state.address = "";
			state.phoneNumber = "";
			state.birthDate = "";
			state.pharmacy = -1;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
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
		setAddress: (state, action) => {
			state.address = action.payload;
		},
		setPhone: (state, action) => {
			state.phone = action.payload;
		},
		setBirthDate: (state, action) => {
			state.birthDate = action.payload;
		},
		setPharmacy: (state, action) => {
			state.pharmacy = action.payload;
		}
	},
});

export const {
	clearData,
	setFirstName,
	setMiddleName,
	setLastName,
	setEmail,
	setPassword,
	setPharmacy,
	setAddress,
	setPhone,
	setBirthDate
} = registerSlice.actions;

export default registerSlice.reducer;
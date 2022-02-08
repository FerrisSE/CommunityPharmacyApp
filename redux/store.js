import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/register-slice';
import userTokenSlice from './slices/user-token-slice';

export default configureStore({
	reducer: {
		userToken: userTokenSlice,
		register: registerSlice
	},
});
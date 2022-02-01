import { configureStore } from '@reduxjs/toolkit';
import userTokenSlice from './slices/user-token-slice';

export default configureStore({
	reducer: {
		userToken: userTokenSlice,
	},
});
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart-slice';
import registerSlice from './slices/register-slice';
import userTokenSlice from './slices/user-token-slice';

export default configureStore({
	reducer: {
		userToken: userTokenSlice,
		register: registerSlice,
		cart: cartSlice,
	},
});
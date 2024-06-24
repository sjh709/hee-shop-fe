import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import commonUIReducer from './reducers/commonUIReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: commonUIReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

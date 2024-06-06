import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import commonUIReducer from './reducers/commonUIReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: commonUIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

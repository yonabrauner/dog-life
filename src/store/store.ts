import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import walksReducer from '../features/walks/walksSlice';
import userReducer from '../features/user/userSlice';
import dogsReducer from '../features/dogs/dogsSlice';


export const store = configureStore({
  reducer: {
    walks: walksReducer,
    user: userReducer,
    dogs: dogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
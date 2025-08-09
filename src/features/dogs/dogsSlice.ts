import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DogActivity } from '../walks/walksSlice';
import { fetchdogs } from '../../api/dogs';

export interface Dog {
    id: number;
    name: string;
    picture?: string;
    activities: DogActivity[];
}

interface DogsState {
    dogs: Dog[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

const initialState: DogsState = {
    dogs: [],
    status: 'idle',
};

export const getDogs = createAsyncThunk('dogs/getDogs', async () => {
    const res = await fetchdogs();
    return res;
});

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDogs.pending, state => {
        state.status = 'loading';
      })
      .addCase(getDogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dogs = action.payload;
      })
      .addCase(getDogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dogsSlice.reducer;
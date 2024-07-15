import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  data: any[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  }

const initialState: DataState = {
  data: [],
  status: 'idle',
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (symbol: string) => {
    
    const response = await axios.get(`http://localhost:5000/data/${symbol}`);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;

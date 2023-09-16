import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get('http://localhost:8000/users');
  return response.data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async userId => {
  await axios.delete(`http://localhost:8000/users/${userId}`);
  return userId;
});

export const updateUser = createAsyncThunk('user/updateUser', async updatedUser => {
  const response = await axios.put(`http://localhost:8000/users/${updatedUser.id}`, updatedUser);
  return response.data;
});

export const addUser = createAsyncThunk('user/addUser', async newUser => {
  const response = await axios.post('http://localhost:8000/users', newUser);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  }
});

export const userSelector = state => state.user;

export default userSlice.reducer;

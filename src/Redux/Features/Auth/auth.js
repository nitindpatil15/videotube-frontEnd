import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};
const host = 'http://localhost:7500/api/v1'

export const loginUser = createAsyncThunk('user/login', async ({ email, username, password }) => {
  const response = await axios.post(`${host}/users/login`, {
    email,
    username,
    password
  },{
    withCredentials:true
  });
  const { accessToken,refreshToken} = response.data.data;
  const { avatar} = response.data.data.UserDetail;
  Cookies.set('accessToken', accessToken, { expires: 1 });
  Cookies.set('refreshToken', refreshToken, { expires: 10 });
  Cookies.set('isLoggedIn',true)
  Cookies.set('avatar',avatar)
  return response.data.data;
});

export const registerUser = createAsyncThunk('user/register', async (formData) => {
  const response = await axios.post(`${host}/users/register`, formData, {
    withCredentials:true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data.data;
});
export const Logout = createAsyncThunk('user/logout',async()=>{
  // eslint-disable-next-line
  const response = await axios.post(
    "http://localhost:7500/api/v1/users/logout",
    {},
    { withCredentials: true }
  );
})

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

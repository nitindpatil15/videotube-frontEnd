import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const host = 'http://localhost:7500/api/v1'

export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser",
  async () => {
    const response = await axios.post(
      `${host}/users/current-user`,
      {},
      {withCredentials:true}
    );
    return response.data;
  }
);

export const UserStats = createAsyncThunk("user/stats", async () => {
  const response = await axios.get(`${host}/dashboard/stats`,{withCredentials:true});
  return response.data.data;
});

export const changeUserPass = createAsyncThunk('user/changePass', async({oldPassword,newPassword})=>{
  const response = await axios.post(
    `${host}/users/change-password`,
    {
      oldPassword,
      newPassword,
    },
    {
      withCredentials:true
    }
  );
  // eslint-disable-next-line
  const data = response.data
  Cookies.remove("accessToken");
})

export const getUserVideos = createAsyncThunk('user/userVideos',async()=>{
    const response = await axios.get(`${host}/dashboard/videos`,{
      withCredentials:true
    });
    return response.data.data 
})

export const EditUserProfile = createAsyncThunk('user/EditDetails',async (formData) => {  
  const response = await axios.patch(
      `${host}/users/update-account`,
      formData,
      {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data
})

export const UserAvatarUpdate = createAsyncThunk('users/avatar',async(formData)=>{
  const response = await axios.patch(`${host}/users/avatar`, formData, {
    withCredentials:true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  Cookies.set("avatar",response.data.data.avatar)
})

export const userWatchHistory = createAsyncThunk("user/history",async()=>{
  const history = await axios.get(`${host}/users/watch-history`,{
    withCredentials:true,
  })
  return history.data.data
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentuser:null,
    data: null,
    status: "idle",
    error: null,
    // for Stats
    stats: null,
    statsStatus: "idle",
    statsError: null,
    // for UserVideos
    userVideos: null,
    userVideosError: null,
    userVideosStatus: 'idle',
    // for avatar 
    avatar: null,
    avatarStatus: 'idle',
    avatarError: null,
    // for history 
    history: null,
    historyStatus: 'idle',
    historyError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentuser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // User Stats State
      .addCase(UserStats.pending, (state) => {
        state.statsStatus = "loading";
      })
      .addCase(UserStats.fulfilled, (state, action) => {
        state.statsStatus = "succeeded";
        state.stats = action.payload;
      })
      .addCase(UserStats.rejected, (state, action) => {
        state.statsStatus = "failed";
        state.statsError = action.error.message;
      })
      // UserVideo States 
      .addCase(getUserVideos.pending, (state) => {
        state.userVideosStatus = "loading";
      })
      .addCase(getUserVideos.fulfilled, (state, action) => {
        state.userVideosStatus = "succeeded";
        state.userVideos = action.payload;
      })
      .addCase(getUserVideos.rejected, (state, action) => {
        state.userVideosStatus = "failed";
        state.userVideosError = action.error.message;
      })
      // For Update Avatar 
      .addCase(UserAvatarUpdate.pending, (state) => {
        state.avatarStatus = "loading";
      })
      .addCase(UserAvatarUpdate.fulfilled, (state, action) => {
        state.avatarStatus = "succeeded";
        state.avatar = action.payload;
      })
      .addCase(UserAvatarUpdate.rejected, (state, action) => {
        state.avatarStatus = "failed";
        state.avatarError = action.error.message;
      })
      // For History 
      .addCase(userWatchHistory.pending, (state) => {
        state.historyStatus = "loading";
      })
      .addCase(userWatchHistory.fulfilled, (state, action) => {
        state.historyStatus = "succeeded";
        state.history = action.payload;
      })
      .addCase(userWatchHistory.rejected, (state, action) => {
        state.historyStatus = "failed";
        state.historyError = action.error.message;
      });
  },
});

export default userSlice.reducer;

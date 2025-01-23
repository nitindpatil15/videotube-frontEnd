import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const host = "http://localhost:7500/api/v1";
const accessToken = Cookies.get("accessToken");

export const getchannelbyusername = createAsyncThunk(
  "user/channel",
  async (username) => {
    const response = await axios.get(`${host}/users/c/${username}`, {
      withCredentials: false,
    });
    return response.data.data;
  }
);

export const toggleSubscribe = createAsyncThunk(
  "channel/subscribe",
  async (channelId) => {
    console.log(channelId)
    try {
      const response = await axios.post(
        `${host}/subscriptions/c/${channelId}`,
        {},
        { Authorization: `Bearer${accessToken}`, withCredentials: true }
      );
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      alert("UnAuthorized User!! Login for Subscribe and more...");
    }
  }
);

export const channelVideo = createAsyncThunk("channel/videos", async (username) => {
  const response = await axios.get(
    `${host}/videos/c/${username}`,
    {},
    { withCredentials: false }
  );
  return response.data.data
});

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    subscribe:null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getchannelbyusername.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getchannelbyusername.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getchannelbyusername.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleSubscribe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleSubscribe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subscribe = action.payload;
      })
      .addCase(toggleSubscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default channelSlice.reducer;

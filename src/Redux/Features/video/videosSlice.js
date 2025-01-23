import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:7500/api/v1';

export const fetchAllVideos = createAsyncThunk('videos/fetchAll', async () => {
  const response = await axios.get(`${host}/videos/?page=1&limit=20`, {
    withCredentials: false // Not Include credentials in the request
  });
  return response.data.data;
});

export const videobyId = createAsyncThunk('video/byId',async(id)=>{
  const response = await axios.get(`${host}/videos/${id}`)
  console.log(response.data.data)
  return response.data.data
})

export const publishvideo = createAsyncThunk('video/publish',async(formdata)=>{
  const response = await axios.post(`${host}/videos/`,formdata,{withCredentials:true,
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  })
  return response.data.data
})

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    error: null,
    status: 'idle',
    // by Id
    video: [],
    videobyIderror: null,
    videobyIdstatus: 'idle',
    // publish Video
    publishvideo:null,
    publishstatus:"idle",
    publisherror:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(videobyId.pending, (state) => {
        state.videobyIdstatus = 'loading';
      })
      .addCase(videobyId.fulfilled, (state, action) => {
        state.videobyIdstatus = 'succeeded';
        state.video = action.payload;
      })
      .addCase(videobyId.rejected, (state, action) => {
        state.videobyIdstatus = 'failed';
        state.videobyIderror = action.error.message;
      })
      .addCase(publishvideo.pending, (state) => {
        state.publishstatus = 'loading';
      })
      .addCase(publishvideo.fulfilled, (state, action) => {
        state.publishstatus = 'succeeded';
        state.publishvideo = action.payload;
      })
      .addCase(publishvideo.rejected, (state, action) => {
        state.publishstatus = 'failed';
        state.publisherror = action.error.message;
      });
  }
});

export default videoSlice.reducer;
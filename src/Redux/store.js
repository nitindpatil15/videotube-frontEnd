import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './Features/video/videosSlice'
import userReducer from './Features/user/userSlice'
import authReducer from './Features/Auth/auth'
import channelReducer from './Features/channel/ChannelSlice'
import commentSlice from './Features/Comment/commentSlice';

const store = configureStore({
  reducer: {
    Auth:authReducer,
    videos: videoReducer,
    user: userReducer,
    channel:channelReducer,
    comment:commentSlice
  }
});

export default store;
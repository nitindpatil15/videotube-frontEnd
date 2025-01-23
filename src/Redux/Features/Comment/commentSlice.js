import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const host = "http://localhost:7500/api/v1";
const accessToken = Cookies.get("accessToken");

export const AddComment = createAsyncThunk(
  "/comment/addcomment",
  async ({videoId, content}) => {
    const comment = await axios.post(`${host}/comments/${videoId}`, {content}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer${accessToken}`,
        "Content-Type":"Application/json"
      },
    });
    console.log(comment.data.data);
    return comment.data.data;
  }
);

export const GetVideoComment = createAsyncThunk(
  "/comment/GetVideocomments",
  async (videoId) => {
    const comments = await axios.get(`${host}/comments/${videoId}`, {
      withCredentials: false,
    });
    return comments.data.data;
  }
);

export const UpdateComment = createAsyncThunk(
  "/comment/Updatecomment",
  async (commentId, data) => {
    const comments = await axios.patch(
      `${host}/comments/c/${commentId}`,
      { data },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${accessToken}`,
        },
      }
    );
    console.log(comments.data.data);
    return comments.data.data;
  }
);

export const DeleteComment = createAsyncThunk(
  "/comment/Deletecomment",
  async (commentId,) => {
    const comments = await axios.delete(
      `${host}/comments/c/${commentId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${accessToken}`,
        },
      }
    );
    console.log(comments.data.data);
    return comments.data.data;
  }
);

const commentSlice = createSlice({
  name: "channel",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    // for all comments
    comments: [],
    commentStatus: "idle",
    commentError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetVideoComment.pending, (state) => {
        state.commentStatus = "loading";
      })
      .addCase(GetVideoComment.fulfilled, (state, action) => {
        state.commentStatus = "succeeded";
        state.comments = action.payload;
      })
      .addCase(GetVideoComment.rejected, (state, action) => {
        state.commentStatus = "failed";
        state.commentError = action.error.message;
      })
      .addCase(UpdateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(UpdateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(DeleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;

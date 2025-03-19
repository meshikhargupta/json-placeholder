import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPage: 1,
    totalPages: 10,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
      state.currentPage = action.payload.page;
    },
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) state.currentPage += 1;
    },
    prevPage: (state) => {
      if (state.currentPage > 1) state.currentPage -= 1;
    },
  },
});

export const { setPosts, nextPage, prevPage } = postSlice.actions;
export default postSlice.reducer;

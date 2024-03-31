import { createSlice } from "@reduxjs/toolkit";
import { getCurrentPost as getCurrentPostApi } from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    currentPost: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
});
export const { setIsLoadingPost, setCurrentPost } = postReducer.actions;

export const getCurrentPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getCurrentPostApi(id)
    .then((res) => {
      dispatch(setCurrentPost(res));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => console.log(err));
};

export default postReducer.reducer;

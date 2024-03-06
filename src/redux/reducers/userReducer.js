import { createSlice } from "@reduxjs/toolkit";
import { login as loginAPI, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    errorMessage: null,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});
export const { setIsLogin, setErrorMessage } = userReducer.actions;

export const login = (username, password) => (dispatch) => {
  dispatch(setErrorMessage(null));
  loginAPI(username, password)
    .then((data) => {
      if (data.ok === 0) {
        return dispatch(setErrorMessage(data.message));
      }
      setAuthToken(data.token);
      getMe()
        .then((res) => {
          if (res.ok !== 1) {
            setAuthToken(null);
            return dispatch(setErrorMessage(res.message));
          }
          dispatch(setIsLogin(true));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const RememberLoginState = () => (dispatch) => {
  getMe().then((res) => {
    if (res.ok) {
      dispatch(setIsLogin(true));
    }
  });
};

export const logout = () => (dispatch) => {
  dispatch(setIsLogin(false));
  setAuthToken(null);
};

export default userReducer.reducer;

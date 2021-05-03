import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AUTH from "constant/auth";
import authApi from "core/API/authApi";

export const registerSlice = createAsyncThunk(
  "auth/register",
  async (payload) => {
    const data = await authApi.register(payload);
    localStorage.setItem(AUTH.TOKEN_KEY, data.user.token);
    return data.user;
  }
);
export const loginGetTokenSlice = createAsyncThunk(
  "auth/loginToken",
  async (payload) => {
    const data = await authApi.loginGetToken(payload);
    if (!!data) {
      localStorage.setItem(AUTH.TOKEN_KEY, data.user.token);
    }

    //save expired at
  }
);
export const loginGetUserInforSlice = createAsyncThunk(
  "auth/loginUser",
  async () => {
    const data = await authApi.loginGetUserInfo();
    
    //save expired at
    return data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    current: {},
  },
  reducers: {},
  extraReducers: {
    [registerSlice.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginGetUserInforSlice.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;

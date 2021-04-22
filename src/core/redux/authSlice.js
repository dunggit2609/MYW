import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AUTH from "constant/auth";
import authApi from "core/API/authApi";

export const registerSlice = createAsyncThunk(
  "auth/register",
  async (payload) => {
    localStorage.removeItem(AUTH.TOKEN_KEY);
    const data = await authApi.register(payload);
    localStorage.setItem(AUTH.TOKEN_KEY, data.jwt);
    localStorage.setItem(AUTH.STORAGE_KEY, JSON.stringify(data.user));

    return data.user;
  }
);
export const loginSlice = createAsyncThunk(
  "auth/login",
  async (payload) => {
    localStorage.removeItem(AUTH.TOKEN_KEY);
    const data = await authApi.login(payload);
    localStorage.setItem(AUTH.TOKEN_KEY, data.jwt);
    localStorage.setItem(AUTH.STORAGE_KEY, JSON.stringify(data.user));

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
    [loginSlice.fulfilled]: (state, action) => {
      state.current = action.payload // tam thoi
    }
  },
  
});

const { reducer } = authSlice;
export default reducer;

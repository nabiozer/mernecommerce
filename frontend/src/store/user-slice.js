import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loading: false,
    error: null,
    user:{},
    succes:false,
    users:[]
  },
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
    },
    userLoginSucces(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },

    userLoginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userLogout(state) {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },

    userRegisterRequest(state) {
      state.loading = true;
    },
    userRegisterSucces(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },

    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userDetailsRequest(state) {
      state.loading = true;
    },
    userDetailsSucces(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },

    userDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userUpdateRequest(state) {
      state.loading = true;
    },
    userUpdateSucces(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.succes = true;
      state.error = null;
    },

    userUpdateFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdateReset(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userListRequest(state) {
      state.loading= true;
    },
    userListUpdate(state,action) {
      state.loading = false;
      state.users = action.payload;
    },
    userListFail(state, action) {
      state.error = action.payload;
      state.loading = false;

    },
    userListReset(state) {
      state.users = [];
    },
    userDeleteRequest(state) { 
      state.loading= true;
    },
    userDeleteSuccess(state) {
      state.loading = false;
      state.succes = true;
    },
    userDeleteFail(state, action) {
      state.error = action.payload;
      state.loading = false;

    },
    userUpdateByAdminRequest(state) { 
      state.loading= true;
    },
    userUpdateByAdminSuccess(state) {
      state.loading = false;
      state.succes = true;
    },
    userUpdateByAdminFail(state, action) {
      state.error = action.payload;
      state.loading = false;

    },
    userUpdateByAdminReset(state) {
      state.user = {};
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

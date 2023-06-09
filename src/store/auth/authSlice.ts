import { createSlice } from '@reduxjs/toolkit';
import { Status, iInitialStateUser } from '../../types';

const initialState: iInitialStateUser = {
  status: Status.Checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = Status.Authenticated;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = Status.NotAuthenticated;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = Status.Checking;
    },
  },
});
export const { login, logout, checkingCredentials } = authSlice.actions;

import type { Dispatch } from '@reduxjs/toolkit';
import { checkingCredentials, login, logout } from '.';
import {
  loginWithEmailPassword,
  logoutFireBase,
  registerUserWithCredentials,
  singInWithGoogle,
} from '../../firebase/provider';
import { iGenericEmailPass, iRegisterWithCredentials } from '../../types';

export const checkingAuthentication = (email: String, password: String) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout('error'));
    console.log({ result });
    dispatch(login(result));
  };
};

export const starCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: iRegisterWithCredentials) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithCredentials({
        email,
        password,
        displayName,
      });
    if (!ok) return dispatch(logout(errorMessage));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const starLoginWithEmailPassword = ({
  email,
  password,
}: iGenericEmailPass) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result.errorMessage));
    console.log({ result });
    dispatch(login(result));
  };
};
export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    await logoutFireBase();
    dispatch(logout(null));
  };
};

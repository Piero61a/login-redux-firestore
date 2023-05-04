import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from '.';
import { iGenericEmailPass, iRegisterWithCredentials } from '../types';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: any) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithCredentials = async ({
  email,
  password,
  displayName,
}: iRegisterWithCredentials) => {
  try {
    console.log({ email, password, displayName });
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    const user = FirebaseAuth.currentUser;
    if (user !== null) {
      await updateProfile(user, { displayName });
      return {
        ok: true,
        uid,
        photoURL,
        email,
        displayName,
      };
    } else {
      throw new Error('No hay usuario actualmente autenticado');
    }
  } catch (error: { code: string; customdata: string; name: string } | any) {
    let errorTmp = ``;
    if (error) {
      errorTmp = `${error.code} `;
      console.log(errorTmp);
    }
    return {
      ok: false,
      errorMessage: errorTmp,
    };
  }
};

export const loginWithEmailPassword = async ({
  email,
  password,
}: iGenericEmailPass) => {
  //!singInWithEmailAndPassword
  try {
    const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, uid, photoURL } = res.user;
    return {
      ok: true,
      displayName,
      photoURL,
      uid,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
      errorCode,
    };
  }
};

export const logoutFireBase = async () => {
  return await FirebaseAuth.signOut();
};

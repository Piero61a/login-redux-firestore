import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase';
import { login, logout } from '../store/auth';

const useCheckOut = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(null));
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  return status;
};

export default useCheckOut;

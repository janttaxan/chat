import { useCallback } from 'react';

import {
  signout as signoutAction,
  signin as signinThunk,
  signup as signupThunk,
  selectUser
} from 'core/redux/slices/user-slice';
import { useDispatch, useSelector } from 'core/redux/store';

type UserData = { username: string; password: string };

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signin = useCallback(
    async ({ username, password }: UserData) => {
      await dispatch(signinThunk({ username, password }));
    },
    [dispatch]
  );

  const signup = useCallback(
    async ({ username, password }: UserData) => {
      await dispatch(signupThunk({ username, password }));
    },
    [dispatch]
  );

  const signout = useCallback(() => {
    dispatch(signoutAction());
  }, [dispatch]);

  return { user, signin, signup, signout };
};

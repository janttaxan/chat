import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { routes } from 'core/routes';

type ActionPayload = {
  username: string;
  password: string;
};
export const signin = createAsyncThunk('user/login', async ({ username, password }: ActionPayload) => {
  const response = await axios.post(routes.api.login(), { username, password });
  return response.data;
});

export const signup = createAsyncThunk('user/signup', async ({ username, password }: ActionPayload) => {
  const response = await axios.post(routes.api.signup(), { username, password });
  return response.data;
});

// export const getUserDataFromLocalStorage = (): AppThunk => (dispatch) => {
//   try {
//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');
//     if (token && username) {
//       dispatch(setUserData({ token, username }));
//     }
//   } catch (err) {
//     //
//   }
// };

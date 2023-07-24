import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signin, signup } from 'core/redux/slices/user-slice/thunks';
import { ReduxState } from 'core/redux/store';

export interface UserState {
  token: Optional<string>;
  username: Optional<string>;
}
export interface UserSliceState extends UserState {
  isAuth: boolean;
  loadingStatus: 'idle' | 'loading' | 'failed';
}

const initialState = (): UserSliceState => {
  let token = null;
  let username = null;

  try {
    token = localStorage.getItem('token');
    username = localStorage.getItem('username');
  } catch (err) {
    //
  }
  return {
    token,
    username,
    isAuth: !!token,
    loadingStatus: 'idle'
  };
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    setUserData(state: UserSliceState, action: PayloadAction<UserState>) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.isAuth = true;
    },
    clearUserData(state: UserSliceState) {
      state.token = null;
      state.username = null;
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<UserState>) => {
        const { token, username } = action.payload;
        state.loadingStatus = 'idle';
        state.token = token;
        state.username = username;
        state.isAuth = true;
      })
      .addCase(signin.rejected, (state) => {
        state.loadingStatus = 'failed';
      })
      .addCase(signup.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<UserState>) => {
        const { token, username } = action.payload;
        state.loadingStatus = 'idle';
        state.token = token;
        state.username = username;
        state.isAuth = true;
      })
      .addCase(signup.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  }
});

export const selectUser = (state: ReduxState) => state.user;
export const { setUserData, clearUserData } = userSlice.actions;

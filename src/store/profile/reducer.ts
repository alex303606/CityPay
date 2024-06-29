import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';

export interface IProfileState {
  userIsLoggedIn: boolean;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    loginUserSuccess(
      state,
    ) {
      state.userIsLoggedIn = true;
    },
  },
});

export const {
  loginUserSuccess,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const selectUserIsLoggedIn = (state: RootState) =>
  state.profile.userIsLoggedIn;

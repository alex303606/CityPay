import {createSlice} from '@reduxjs/toolkit';
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
    loginUserSuccess(state) {
      return {...state, userIsLoggedIn: true};
    },
    signOut() {
      return initialState;
    },
  },
});

export const {loginUserSuccess, signOut} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const selectUserIsLoggedIn = (state: RootState) =>
  state.profile.userIsLoggedIn;

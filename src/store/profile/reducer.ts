import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';

export interface IProfileState {
  userIsLoggedIn: boolean;
  selectedLanguage: string;
  userId: string | null;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
  selectedLanguage: 'ru',
  userId: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    loginUserSuccess(state, action: PayloadAction<string>) {
      state.userIsLoggedIn = true;
      state.userId = action.payload;
    },
    signOut(state) {
      return {...initialState, selectedLanguage: state.selectedLanguage};
    },
    changeLanguage(state, action: PayloadAction<string>) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const {loginUserSuccess, signOut, changeLanguage} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const selectUserIsLoggedIn = (state: RootState) =>
  state.profile.userIsLoggedIn;
export const selectedLanguage = (state: RootState) =>
  state.profile.selectedLanguage;

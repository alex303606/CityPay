import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {Themes} from '../../themes';

export interface IProfileState {
  userIsLoggedIn: boolean;
  selectedLanguage: string;
  userId: string | null;
  theme: Themes;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
  selectedLanguage: 'ru',
  userId: null,
  theme: Themes.DEFAULT,
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
    changeTheme(state, action: PayloadAction<Themes>) {
      state.theme = action.payload;
    },
  },
});

export const {loginUserSuccess, signOut, changeLanguage, changeTheme} =
  profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const selectUserIsLoggedIn = (state: RootState) =>
  state.profile.userIsLoggedIn;
export const selectedLanguage = (state: RootState) =>
  state.profile.selectedLanguage;
export const selectedTheme = (state: RootState) => state.profile.theme;

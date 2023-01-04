import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {Themes} from '../../themes';

export interface IProfileState {
  userIsLoggedIn: boolean;
  selectedLanguage: string;
  phone: string;
  userId: string | null;
  theme: Themes;
  balls: number;
  black_list: boolean;
  carsLimit: number;
  isPremiumAccess: boolean;
  last_name: string;
  name: string;
  rating: number;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
  selectedLanguage: 'ru',
  phone: '',
  userId: null,
  theme: Themes.DEFAULT,
  name: '',
  last_name: '',
  rating: 0,
  balls: 0,
  black_list: false,
  carsLimit: 0,
  isPremiumAccess: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    loginUserSuccess(
      state,
      action: PayloadAction<{user_id: string; phone: string}>,
    ) {
      state.userIsLoggedIn = true;
      state.userId = action.payload.user_id;
      state.phone = action.payload.phone;
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
    getUserSuccess(
      state,
      action: PayloadAction<{
        balls: number;
        black_list: boolean;
        carsLimit: number;
        isPremiumAccess: boolean;
        last_name: string;
        name: string;
        rating: number;
        user_id: string;
      }>,
    ) {
      const {
        name,
        last_name,
        balls,
        user_id,
        carsLimit,
        isPremiumAccess,
        rating,
        black_list,
      } = action.payload;

      state.name = name;
      state.last_name = last_name;
      state.balls = balls;
      state.black_list = black_list;
      state.carsLimit = carsLimit;
      state.isPremiumAccess = isPremiumAccess;
      state.rating = rating;
      state.userId = user_id;
    },
  },
});

export const {
  loginUserSuccess,
  signOut,
  changeLanguage,
  changeTheme,
  getUserSuccess,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const selectUserIsLoggedIn = (state: RootState) =>
  state.profile.userIsLoggedIn;
export const getUserPhone = (state: RootState) => state.profile.phone;
export const getUserState = (state: RootState) => state.profile;
export const selectedLanguage = (state: RootState) =>
  state.profile.selectedLanguage;
export const selectedTheme = (state: RootState) => state.profile.theme;

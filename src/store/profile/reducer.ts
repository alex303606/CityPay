import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {Themes} from '../../themes';

export enum ILanguages {
  en = 'en',
  ru = 'ru',
  kg = 'kg',
}

export enum PushActive {
  enabled = 'Y',
  disabled = 'N',
}

export interface IProfileState {
  userIsLoggedIn: boolean;
  selectedLanguage: ILanguages;
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
  avatar: string;
  pushToken?: string;
  pushActive: PushActive;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
  selectedLanguage: ILanguages.ru,
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
  avatar: '',
  pushToken: undefined,
  pushActive: PushActive.enabled,
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
    changeLanguage(state, action: PayloadAction<ILanguages>) {
      state.selectedLanguage = action.payload;
    },
    changeTheme(state, action: PayloadAction<Themes>) {
      state.theme = action.payload;
    },
    saveAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
    changePushActive(state, action: PayloadAction<PushActive>) {
      state.pushActive = action.payload;
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
  saveAvatar,
  changePushActive,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const selectUserIsLoggedIn = (state: RootState) =>
  state.profile.userIsLoggedIn;
export const getUserState = (state: RootState) => state.profile;
export const selectedLanguage = (state: RootState) =>
  state.profile.selectedLanguage;
export const selectedTheme = (state: RootState) => state.profile.theme;

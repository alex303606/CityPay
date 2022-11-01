import {EScreens} from './types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  [EScreens.LOGIN_SCREEN]: undefined;
  [EScreens.SMS_CONFIRM_SCREEN]: undefined;
};

export type RootStackParamList = {
  [EScreens.AUTHORIZATION_STACK]: undefined;
};

export type AuthorizationStackProps = NativeStackScreenProps<
  RootStackParamList,
  EScreens.AUTHORIZATION_STACK
>;

export type CarsStackParamList = {
  [EScreens.CARS_SCREEN]: undefined;
};

export type CarsStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.CARS_STACK
>;

export type FinesStackParamList = {
  [EScreens.FINES_SCREEN]: undefined;
};

export type FinesStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.FINES_STACK
>;

//TABS
export type RootTabParamList = {
  [EScreens.CARS_STACK]: undefined;
  [EScreens.FINES_STACK]: undefined;
  [EScreens.PAYMENTS_STACK]: undefined;
  [EScreens.SETTINGS_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
};

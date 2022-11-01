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

//TABS
export type RootTabParamList = {
  [EScreens.CARS_STACK]: undefined;
  [EScreens.FINES_SCREEN]: undefined;
  [EScreens.PAYMENTS_SCREEN]: undefined;
  [EScreens.SETTINGS_SCREEN]: undefined;
  [EScreens.PROFILE_SCREEN]: undefined;
};

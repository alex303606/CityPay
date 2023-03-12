import {EScreens} from './types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {ICar, IFine} from '@store';

export type AuthStackParamList = {
  [EScreens.INITIAL_SCREEN]: undefined;
  [EScreens.LOGIN_SCREEN]: undefined;
  [EScreens.SMS_CONFIRM_SCREEN]: {
    phone: string;
  };
};

export type RootStackParamList = {
  [EScreens.AUTHORIZATION_STACK]: undefined;
  [EScreens.ROOT_TABS]: undefined;
};

export type AuthorizationStackProps = NativeStackScreenProps<
  RootStackParamList,
  EScreens.AUTHORIZATION_STACK
>;

export type CarsStackParamList = {
  [EScreens.CARS_SCREEN]: undefined;
  [EScreens.MODAL_ADD_CAR]: undefined;
  [EScreens.MODAL_ADD_CAR]: undefined;
  [EScreens.SINGLE_FINE_SCREEN]: {fine: IFine};
  [EScreens.SINGLE_CAR_SCREEN]: {
    car: ICar;
    isNewNumber: boolean;
  };
  [EScreens.MODAL_DELETE_CAR]: {car: ICar};
  [EScreens.MODAL_IMAGE_VIEWER]: {url: string};
  [EScreens.PAYMENTS_INFO_SCREEN]: {
    paymentNumber: string;
    amount: string;
    fine?: IFine;
  };
};

export type CarsStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.CARS_STACK
>;

export type FinesStackParamList = {
  [EScreens.FINES_SCREEN]: undefined;
  [EScreens.SELECT_FINE_TYPE_SCREEN]: undefined;
  [EScreens.MODAL_IMAGE_VIEWER]: {url: string};
  [EScreens.SINGLE_FINE_SCREEN]: {fine: IFine};
  [EScreens.PAYMENTS_BY_QR_SCREEN]: {type: string};
  [EScreens.PAYMENTS_INFO_SCREEN]: {
    paymentNumber: string;
    amount: string;
    fine?: IFine;
  };
};

export type PaymentsStackParamList = {
  [EScreens.PAYMENTS_SCREEN]: undefined;
  [EScreens.PAYMENT_SCREEN]: {paymentNumber: string};
};

export type FinesStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.FINES_STACK
>;

export type PaymentsStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.PAYMENTS_STACK
>;

export type SettingsStackProps = StackScreenProps<
  RootTabParamList,
  EScreens.SETTINGS_STACK
>;

export type SettingsStackParamList = {
  [EScreens.SETTINGS_SCREEN]: undefined;
  [EScreens.WEBVIEW_SCREEN]: {uri: string; title: string};
};

export type ProfileStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.PROFILE_STACK
>;

export type ProfileStackParamList = {
  [EScreens.PROFILE_SCREEN]: undefined;
  [EScreens.MODAL_LANGUAGE_SCREEN]: undefined;
  [EScreens.MODAL_EXIT_SCREEN]: undefined;
  [EScreens.PROFILE_SETTINGS_SCREEN]: undefined;
  [EScreens.MODAL_PHOTO_SCREEN]: undefined;
};

//TABS
export type RootTabParamList = {
  [EScreens.CARS_STACK]: undefined;
  [EScreens.FINES_STACK]: undefined;
  [EScreens.PAYMENTS_STACK]: undefined;
  [EScreens.SETTINGS_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
};

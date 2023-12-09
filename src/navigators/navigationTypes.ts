import {EScreens} from './types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {ICar, IFine, IFinesType, IPartner} from '@store';
import {ICard} from 'src/screens/MyCardsScreen/MyCardsScreen';

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
  [EScreens.MODAL_BUY_PREMIUM_SCREEN]: {title: string};
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
    finesType: IFinesType;
  };
  [EScreens.FINES_SCREEN]: undefined;
  [EScreens.PREMIUM_SCREEN]: {title: string};
  [EScreens.WEBVIEW_SCREEN]: {uri: string; title: string};
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
    finesType: IFinesType;
  };
};

export type PaymentsStackParamList = {
  [EScreens.PAYMENTS_SCREEN]: undefined;
  [EScreens.PAYMENT_SCREEN]: {paymentNumber: string};
  [EScreens.FINES_SCREEN]: undefined;
};

export type OsagoStackParamList = {
  [EScreens.OSAGO_SCREEN]: undefined;
  [EScreens.SELECT_CITY_SCREEN]: undefined;
  [EScreens.NEW_STATEMENT_SCREEN]: {partner: IPartner};
  [EScreens.INFO_PAYMENTS_SCREEN]: undefined;
  [EScreens.POLICY_SCREEN]: {url: string};
  [EScreens.DOCUMENTS_SCREEN]: {numberOfDrivers: number};
  [EScreens.APPLICATION_SCREEN]: {id: string};
};

export type SettingsStackProps = StackScreenProps<
  ProfileStackParamList,
  EScreens.SETTINGS_STACK
>;

export type FinesStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.FINES_STACK
>;

export type PaymentsStackProps = NativeStackScreenProps<
  RootTabParamList,
  EScreens.PAYMENTS_STACK
>;

export type OsagoStackProps = StackScreenProps<
  RootTabParamList,
  EScreens.OSAGO_STACK
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
  [EScreens.MODAL_DELETE_ACCOUNT_SCREEN]: undefined;
  [EScreens.MODAL_DELETE_CARD_SCREEN]: {card: ICard};
  [EScreens.PROFILE_SETTINGS_SCREEN]: undefined;
  [EScreens.MODAL_PHOTO_SCREEN]: undefined;
  [EScreens.MY_CARDS_SCREEN]: undefined;
  [EScreens.MODAL_BUY_PREMIUM_SCREEN]: {title: string};
  [EScreens.PREMIUM_SCREEN]: {title: string};
  [EScreens.WEBVIEW_SCREEN]: {uri: string; title: string};
  [EScreens.SETTINGS_STACK]: undefined;
};

//TABS
export type RootTabParamList = {
  [EScreens.CARS_STACK]: undefined;
  [EScreens.FINES_STACK]: undefined;
  [EScreens.PAYMENTS_STACK]: undefined;
  [EScreens.OSAGO_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
};

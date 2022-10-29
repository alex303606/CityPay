import {EScreens} from './types';
import {StackScreenProps} from '@react-navigation/stack';

export type AuthStackParamList = {
  [EScreens.LOGIN_SCREEN]: undefined;
};

export type RootStackParamList = {
  [EScreens.AUTHORIZATION_STACK]: {};
};

export type AuthorizationStackProps = StackScreenProps<
  RootStackParamList,
  EScreens.AUTHORIZATION_STACK
>;

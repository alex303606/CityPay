import {EScreens} from './types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  [EScreens.INITIAL_SCREEN]: undefined;
};

export type RootStackParamList = {
  [EScreens.AUTHORIZATION_STACK]: undefined;
};

export type AuthorizationStackProps = NativeStackScreenProps<
  RootStackParamList,
  EScreens.AUTHORIZATION_STACK
>;

import React from 'react';
import {EScreens} from './types';
import {ProfileStackParamList, ProfileStackProps} from './navigationTypes';
import {
  ModalBuyPremiumScreen,
  ModalDeleteAccount,
  ModalDeleteCard,
  ModalLanguageScreen,
  ModalPhotoScreen,
  MyCardsScreen,
  ProfileScreen,
  ProfileSettingsScreen,
} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useModalScreenOptions} from './screenOptions';
import {ModalExitScreen} from '../screens/ModalExitScreen/ModalExitScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC<ProfileStackProps> = () => {
  const modalStackScreenOptions = useModalScreenOptions();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={EScreens.PROFILE_SCREEN}
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={EScreens.PROFILE_SETTINGS_SCREEN}
          component={ProfileSettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={EScreens.MY_CARDS_SCREEN}
          component={MyCardsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={modalStackScreenOptions}>
        <Stack.Screen
          name={EScreens.MODAL_BUY_PREMIUM_SCREEN}
          component={ModalBuyPremiumScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={EScreens.MODAL_LANGUAGE_SCREEN}
          component={ModalLanguageScreen}
        />
        <Stack.Screen
          name={EScreens.MODAL_EXIT_SCREEN}
          component={ModalExitScreen}
        />
        <Stack.Screen
          name={EScreens.MODAL_PHOTO_SCREEN}
          component={ModalPhotoScreen}
        />
        <Stack.Screen
          name={EScreens.MODAL_DELETE_ACCOUNT_SCREEN}
          component={ModalDeleteAccount}
        />
        <Stack.Screen
          name={EScreens.MODAL_DELETE_CARD_SCREEN}
          component={ModalDeleteCard}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

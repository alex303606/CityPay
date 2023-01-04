import React from 'react';
import {EScreens} from './types';
import {ProfileStackParamList, ProfileStackProps} from './navigationTypes';
import {ModalLanguageScreen, ProfileScreen} from '@screens';
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
      </Stack.Group>
      <Stack.Group screenOptions={modalStackScreenOptions}>
        <Stack.Screen
          name={EScreens.MODAL_LANGUAGE_SCREEN}
          component={ModalLanguageScreen}
        />
        <Stack.Screen
          name={EScreens.MODAL_EXIT_SCREEN}
          component={ModalExitScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

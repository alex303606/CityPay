import React from 'react';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsStackParamList, SettingsStackProps} from './navigationTypes';
import {SettingsScreen} from '@screens';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStack: React.FC<SettingsStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

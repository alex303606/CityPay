import React from 'react';
import {EScreens} from './types';
import {SettingsStackParamList, SettingsStackProps} from './navigationTypes';
import {SettingsScreen, WebViewScreen} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useModalScreenOptions} from './screenOptions';

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsStack: React.FC<SettingsStackProps> = () => {
  const modalStackScreenOptions = useModalScreenOptions();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={modalStackScreenOptions}>
        <Stack.Screen
          name={EScreens.WEBVIEW_SCREEN}
          component={WebViewScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

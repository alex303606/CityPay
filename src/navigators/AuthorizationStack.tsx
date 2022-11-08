import React from 'react';
import {InitialScreen, LoginScreen, SMSConfirmScreen} from '@screens';
import {EScreens} from './types';
import {AuthorizationStackProps, AuthStackParamList} from './navigationTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthorizationStack: React.FC<AuthorizationStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={EScreens.INITIAL_SCREEN}>
      <Stack.Screen
        name={EScreens.INITIAL_SCREEN}
        component={InitialScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.SMS_CONFIRM_SCREEN}
        component={SMSConfirmScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

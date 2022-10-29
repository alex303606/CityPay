import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '@screens';
import {EScreens} from './types';
import {AuthorizationStackProps, AuthStackParamList} from './navigationTypes';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthorizationStack: React.FC<AuthorizationStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

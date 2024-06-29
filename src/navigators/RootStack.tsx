import React from 'react';
import {EScreens} from './types';
import {RootStackParamList} from './navigationTypes';
import {AuthorizationStack} from './AuthorizationStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName={EScreens.AUTHORIZATION_STACK}>
        <Stack.Screen
            name={EScreens.AUTHORIZATION_STACK}
            component={AuthorizationStack}
            options={{
              headerShown: false,
            }}
        />
      </Stack.Navigator>
    </>
  );
};

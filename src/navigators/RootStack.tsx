import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens} from './types';
import {RootStackParamList} from './navigationTypes';
import {AuthorizationStack} from './AuthorizationStack';
const Stack = createStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={EScreens.AUTHORIZATION_STACK}>
      <Stack.Screen
        name={EScreens.AUTHORIZATION_STACK}
        component={AuthorizationStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

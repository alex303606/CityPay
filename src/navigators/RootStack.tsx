import React from 'react';
import {EScreens} from './types';
import {RootStackParamList} from './navigationTypes';
import {AuthorizationStack} from './AuthorizationStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

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

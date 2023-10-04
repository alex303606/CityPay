import React from 'react';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OsagoStackParamList, OsagoStackProps} from './navigationTypes';
import {OsagoScreen} from '@screens';

const Stack = createNativeStackNavigator<OsagoStackParamList>();

export const OsagoStack: React.FC<OsagoStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.OSAGO_SCREEN}
        component={OsagoScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

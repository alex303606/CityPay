import React from 'react';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OsagoStackParamList, OsagoStackProps} from './navigationTypes';
import {
  DocumentsScreen,
  OsagoScreen,
  SelectCityScreen,
  StatementScreen,
  InfoPaymentScreen,
} from '@screens';
import {ApplicationScreen, PolicyScreen} from '../screens/Osago';

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
      <Stack.Screen
        name={EScreens.SELECT_CITY_SCREEN}
        component={SelectCityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.NEW_STATEMENT_SCREEN}
        component={StatementScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.DOCUMENTS_SCREEN}
        component={DocumentsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.INFO_PAYMENTS_SCREEN}
        component={InfoPaymentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.APPLICATION_SCREEN}
        component={ApplicationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.POLICY_SCREEN}
        component={PolicyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

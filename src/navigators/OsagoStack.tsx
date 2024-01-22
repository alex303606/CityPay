import React from 'react';
import {EScreens} from './types';
import {OsagoStackParamList, OsagoStackProps} from './navigationTypes';
import {
  DocumentsScreen,
  OsagoScreen,
  SelectCityScreen,
  StatementScreen,
  InfoPaymentScreen,
  WebViewScreen,
} from '@screens';
import {
  ApplicationScreen,
  CalculationCostScreen,
  PolicyScreen,
} from '../screens/Osago';
import {useModalScreenOptions} from './screenOptions';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<OsagoStackParamList>();

export const OsagoStack: React.FC<OsagoStackProps> = () => {
  const modalStackScreenOptions = useModalScreenOptions();

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
      <Stack.Group screenOptions={modalStackScreenOptions}>
        <Stack.Screen
          name={EScreens.WEBVIEW_SCREEN}
          component={WebViewScreen}
        />
      </Stack.Group>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={EScreens.CALCULATION_COST_SCREEN}
        component={CalculationCostScreen}
      />
    </Stack.Navigator>
  );
};

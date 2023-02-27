import React from 'react';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaymentsStackParamList, PaymentsStackProps} from './navigationTypes';
import {PaymentScreen, PaymentsScreen} from '@screens';

const Stack = createNativeStackNavigator<PaymentsStackParamList>();

export const PaymentsStack: React.FC<PaymentsStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.PAYMENTS_SCREEN}
        component={PaymentsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.PAYMENT_SCREEN}
        component={PaymentScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

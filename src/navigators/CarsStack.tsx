import React from 'react';
import {CarsScreen} from '@screens';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CarsStackParamList, CarsStackProps} from './navigationTypes';

const Stack = createNativeStackNavigator<CarsStackParamList>();

export const CarsStack: React.FC<CarsStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CARS_SCREEN}
        component={CarsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

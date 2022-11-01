import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CarsScreen} from '@screens';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CarsStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<CarsStackParamList>();

export const CarsStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CARS_SCREEN}
        component={CarsScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

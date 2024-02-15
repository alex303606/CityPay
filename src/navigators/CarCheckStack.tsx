import React from 'react';
import {EScreens} from './types';
import {CarCheckScreen} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {CarCheckStackParamList, CarCheckStackProps} from './navigationTypes';

const Stack = createStackNavigator<CarCheckStackParamList>();

export const CarCheckStack: React.FC<CarCheckStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CAR_CHECK_SCREEN}
        component={CarCheckScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

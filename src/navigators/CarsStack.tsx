import React from 'react';
import {AddAutoModalScreen, CarsScreen} from '@screens';
import {EScreens} from './types';
import {CarsStackParamList, CarsStackProps} from './navigationTypes';
import {createStackNavigator} from '@react-navigation/stack';
import {useModalScreenOptions} from './screenOptions';

const Stack = createStackNavigator<CarsStackParamList>();

export const CarsStack: React.FC<CarsStackProps> = () => {
  const modalStackScreenOptions = useModalScreenOptions();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CARS_SCREEN}
        component={CarsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={modalStackScreenOptions}>
        <Stack.Screen
          name={EScreens.MODAL_ADD_CAR}
          component={AddAutoModalScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

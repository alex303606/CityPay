import React from 'react';
import {
  AddAutoModalScreen,
  CarsScreen,
  ModalDeleteCar,
  SingleCarScreen,
} from '@screens';
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
      <Stack.Screen
        name={EScreens.SINGLE_CAR_SCREEN}
        component={SingleCarScreen}
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
        <Stack.Screen
          name={EScreens.MODAL_DELETE_CAR}
          component={ModalDeleteCar}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

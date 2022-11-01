import React from 'react';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FinesStackParamList, FinesStackProps} from './navigationTypes';
import {FinesScreen} from '@screens';

const Stack = createNativeStackNavigator<FinesStackParamList>();

export const FinesStack: React.FC<FinesStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.FINES_SCREEN}
        component={FinesScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

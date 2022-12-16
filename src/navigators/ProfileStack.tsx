import React from 'react';
import {EScreens} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackParamList, ProfileStackProps} from './navigationTypes';
import {ProfileScreen} from '@screens';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC<ProfileStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

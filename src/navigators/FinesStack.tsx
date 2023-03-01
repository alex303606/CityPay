import React from 'react';
import {EScreens} from './types';
import {FinesStackParamList, FinesStackProps} from './navigationTypes';
import {
  FinesScreen,
  ModalImageViewer,
  SelectFineTypeScreen,
  SingleFineScreen,
} from '@screens';
import {useModalScreenOptions} from './screenOptions';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@hooks';

const Stack = createStackNavigator<FinesStackParamList>();

export const FinesStack: React.FC<FinesStackProps> = () => {
  const modalStackScreenOptions = useModalScreenOptions();
  const {theme} = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.FINES_SCREEN}
        component={FinesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.SINGLE_FINE_SCREEN}
        component={SingleFineScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.SELECT_FINE_TYPE_SCREEN}
        component={SelectFineTypeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={modalStackScreenOptions}>
        <Stack.Screen
          name={EScreens.MODAL_IMAGE_VIEWER}
          component={ModalImageViewer}
          options={{
            headerShown: true,
            title: '',
            headerStyle: {
              backgroundColor: theme.backgroundColor,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

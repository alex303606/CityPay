import React from 'react';
import {
  AddAutoModalScreen,
  CarsScreen,
  ModalBuyPremiumScreen,
  ModalDeleteCar,
  ModalImageViewer,
  PaymentInfoScreen,
  PremiumScreen,
  ProfileSettingsScreen,
  SingleCarScreen,
  SingleFineScreen,
  WebViewScreen,
} from '@screens';
import {EScreens} from './types';
import {CarsStackParamList, CarsStackProps} from './navigationTypes';
import {createStackNavigator} from '@react-navigation/stack';
import {useModalScreenOptions} from './screenOptions';
import {useTheme} from '@hooks';

const Stack = createStackNavigator<CarsStackParamList>();

export const CarsStack: React.FC<CarsStackProps> = () => {
  const modalStackScreenOptions = useModalScreenOptions();
  const {theme} = useTheme();

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
          name={EScreens.MODAL_BUY_PREMIUM_SCREEN}
          component={ModalBuyPremiumScreen}
          options={{
            headerShown: false,
          }}
        />
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
        <Stack.Screen
          name={EScreens.SINGLE_FINE_SCREEN}
          component={SingleFineScreen}
          options={{
            headerShown: false,
          }}
        />
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
        <Stack.Screen
          name={EScreens.PAYMENTS_INFO_SCREEN}
          component={PaymentInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={EScreens.PREMIUM_SCREEN}
          component={PremiumScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={EScreens.WEBVIEW_SCREEN}
          component={WebViewScreen}
        />
        <Stack.Screen
          name={EScreens.PROFILE_SETTINGS_SCREEN}
          component={ProfileSettingsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

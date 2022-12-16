import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Icon, IconNames, TAB_BAR_HEIGHT, Typography} from '@UIKit';
import {RootTabParamList} from './navigationTypes';
import {EScreens} from './types';
import {CarsStack} from './CarsStack';
import {FinesStack} from './FinesStack';
import {useTranslation} from 'react-i18next';
import {PaymentsStack} from './PaymentsStack';

type LabelProps = {
  focused: boolean;
  title: string;
};

const {R11, B11, B28} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title}) => {
  if (focused) {
    return <B11 color={Colors.blue}>{title}</B11>;
  }
  return <R11 color={Colors.grey}>{title}</R11>;
};

export const RootTabs: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          paddingBottom: 7,
          paddingTop: 7,
          elevation: 8,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.grey,
      }}>
      <Tab.Screen
        name={EScreens.CARS_STACK}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.cars')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.myAuto} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={EScreens.FINES_STACK}
        component={FinesStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.fines')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.fines} />
          ),
          tabBarBadge: 5,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={EScreens.PAYMENTS_STACK}
        component={PaymentsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.payments')} />
          ),
          tabBarIcon: ({color}) => <B28 color={color}>⊆</B28>,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

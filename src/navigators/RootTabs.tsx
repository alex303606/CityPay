import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, IconNames, TAB_BAR_HEIGHT, Typography} from '@UIKit';
import {RootTabParamList} from './navigationTypes';
import {EScreens} from './types';
import {CarsStack} from './CarsStack';
import {FinesStack} from './FinesStack';
import {useTranslation} from 'react-i18next';
import {PaymentsStack} from './PaymentsStack';
import {SettingsStack} from './SettingsStack';
import {ProfileStack} from './ProfileStack';
import {useTheme} from '@hooks';

type LabelProps = {
  focused: boolean;
  title: string;
  color: string;
};

const {R11, B11, B28} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title, color}) => {
  if (focused) {
    return <B11 color={color}>{title}</B11>;
  }
  return <R11 color={color}>{title}</R11>;
};

export const RootTabs: React.FC = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          paddingBottom: 7,
          paddingTop: 7,
          elevation: 8,
          backgroundColor: theme.backgroundColor,
        },
        tabBarActiveTintColor: theme.tabActiveColor,
        tabBarInactiveTintColor: theme.tabInactiveColor,
      }}>
      <Tab.Screen
        name={EScreens.CARS_STACK}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Label color={color} focused={focused} title={t('tabs.cars')} />
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
          tabBarLabel: ({focused, color}) => (
            <Label color={color} focused={focused} title={t('tabs.fines')} />
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
          tabBarLabel: ({focused, color}) => (
            <Label color={color} focused={focused} title={t('tabs.payments')} />
          ),
          tabBarIcon: ({color}) => <B28 color={color}>⊆</B28>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={EScreens.SETTINGS_STACK}
        component={SettingsStack}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Label color={color} focused={focused} title={t('tabs.settings')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.help} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={EScreens.PROFILE_STACK}
        component={ProfileStack}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Label color={color} focused={focused} title={t('tabs.profile')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.profile} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

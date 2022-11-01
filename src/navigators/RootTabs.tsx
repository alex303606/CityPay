import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Icon, IconNames, TAB_BAR_HEIGHT, Typography} from '@UIKit';
import {RootTabParamList} from './navigationTypes';
import {EScreens} from './types';
import {CarsStack} from './CarsStack';

type LabelProps = {
  focused: boolean;
  title: string;
};

const {R11, B11} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title}) => {
  if (focused) {
    return <B11 color={Colors.mainPrimary}>{title}</B11>;
  }
  return <R11 color={Colors.grey}>{title}</R11>;
};

export const RootTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          elevation: 8,
          backgroundColor: Colors.white,
        },
        inactiveTintColor: Colors.grey,
        activeTintColor: Colors.mainPrimary,
        keyboardHidesTabBar: true,
        tabStyle: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen
        name={EScreens.CARS_STACK}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={'cars'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={
                focused ? IconNames.catalogActive : IconNames.catalogInactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.FINES_SCREEN}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={'fines'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={
                focused
                  ? IconNames.favoritesActive
                  : IconNames.favoritesInactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.PAYMENTS_SCREEN}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={'payment'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={
                focused ? IconNames.profileActive : IconNames.profileInactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.SETTINGS_SCREEN}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={'settings'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={focused ? IconNames.basketActive : IconNames.basketInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.PROFILE_SCREEN}
        component={CarsStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={'profile'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={focused ? IconNames.basketActive : IconNames.basketInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

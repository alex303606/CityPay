import React from 'react';
import {EScreens} from './types';
import {RootStackParamList} from './navigationTypes';
import {AuthorizationStack} from './AuthorizationStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootTabs} from './RootTabs';
import {useAppSelector} from '@hooks';
import {selectUserIsLoggedIn} from '@store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  const userIsLoggedIn = useAppSelector(selectUserIsLoggedIn);
  return (
    <Stack.Navigator
      initialRouteName={
        userIsLoggedIn ? EScreens.ROOT_TABS : EScreens.AUTHORIZATION_STACK
      }>
      {userIsLoggedIn ? (
        <Stack.Screen
          name={EScreens.ROOT_TABS}
          component={RootTabs}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={EScreens.AUTHORIZATION_STACK}
          component={AuthorizationStack}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

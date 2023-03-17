import React, {useEffect} from 'react';
import {EScreens} from './types';
import {RootStackParamList} from './navigationTypes';
import {AuthorizationStack} from './AuthorizationStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootTabs} from './RootTabs';
import {useAppSelector, useDependencies, useTheme} from '@hooks';
import {
  editUserData,
  getUserState,
  selectedLanguage,
  selectUserIsLoggedIn,
} from '@store';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  const {i18n} = useTranslation();
  const userIsLoggedIn = useAppSelector(selectUserIsLoggedIn);
  const language = useAppSelector(selectedLanguage);
  const deps = useDependencies();
  const remoteNotificationClient = deps.get('remoteNotificationClient');
  const user = useAppSelector(getUserState);

  useEffect(() => {
    if (userIsLoggedIn) {
      remoteNotificationClient.getToken().then((token: string) => {
        editUserData({...user, pushToken: token});
      });
    }
  }, [remoteNotificationClient, user, userIsLoggedIn]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const {theme} = useTheme();

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
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
    </>
  );
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from '@navigators';
import {Provider} from 'react-redux';
import {store, persistor} from './store/configureStore';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {PresentationDependencies} from './Application/types';
import {StatusBar} from 'react-native';
import {Colors} from '@UIKit';

enableScreens();

const getMainComponent = (_deps: PresentationDependencies) => {
  const MainComponent: React.FC = () => {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <NavigationContainer>
                <StatusBar
                  barStyle={'dark-content'}
                  backgroundColor={Colors.white}
                />
                <RootStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    );
  };

  return MainComponent;
};

export const init = (dependencies: PresentationDependencies) =>
  getMainComponent(dependencies);

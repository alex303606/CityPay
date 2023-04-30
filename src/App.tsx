/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from '@navigators';
import {Provider} from 'react-redux';
import {store, persistor} from './store/configureStore';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {PresentationDependencies} from './Application/types';
import {Text} from 'react-native';
import {DependenciesContext} from './Application/dependencies';
import {UIDependenciesServiceLocator} from './Application/IUIDependenciesServiceLocator';
import {adapty, LogLevel} from 'react-native-adapty';

enableScreens();

// @ts-ignore
if (Text && !Text.defaultProps) {
  // @ts-ignore
  Text.defaultProps = {};
  // @ts-ignore
  Text.defaultProps.allowFontScaling = false;
}

const getMainComponent = (deps: PresentationDependencies) => {
  const MainComponent: React.FC = () => {
    const {navigationService} = deps;

    useEffect(() => {
      adapty.activate('public_live_t4AzGo3Q.0stLfLxTmzhs9cvx6GqD');
      adapty.setLogLevel(LogLevel.VERBOSE);
    }, []);

    return (
      <DependenciesContext.Provider
        value={UIDependenciesServiceLocator.init(deps)}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <NavigationContainer
                ref={navigationService.navigationRef}
                onReady={() => {
                  navigationService.isReadyRef.current = true;
                }}
                fallback={<Text>Loading...</Text>}>
                <RootStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </DependenciesContext.Provider>
    );
  };

  return MainComponent;
};

export const init = (dependencies: PresentationDependencies) =>
  getMainComponent(dependencies);

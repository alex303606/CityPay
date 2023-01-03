import type {StackNavigationOptions} from '@react-navigation/stack';
import {Colors} from '@UIKit';
import {useMemo} from 'react';
import {Easing} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

export const useModalScreenOptions = () => {
  const {height} = useSafeAreaFrame();

  return useMemo<StackNavigationOptions>(
    () => ({
      headerShown: false,
      presentation: 'modal',
      cardStyle: {backgroundColor: Colors.transparent},
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {easing: Easing.out(Easing.ease)},
        },
        close: {
          animation: 'timing',
          config: {easing: Easing.in(Easing.ease)},
        },
      },
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({current: {progress}}) => ({
        cardStyle: {
          translateY: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [height, height * 0.9, height * 0.15, 0],
          }),
        },
        overlayStyle: {
          backgroundColor: Colors.black,
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.1, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
      detachPreviousScreen: false,
    }),
    [height],
  );
};

export const transparentScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: Colors.transparent},
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {easing: Easing.out(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {easing: Easing.in(Easing.ease)},
    },
  },
  cardOverlayEnabled: true,
  detachPreviousScreen: false,
  cardStyleInterpolator: () => ({}),
};

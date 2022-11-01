import React from 'react';
import {Button} from 'react-native';
import {Block} from '@UIKit';
import {EScreens} from '../../navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '../../navigators/navigationTypes';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

export const CarsScreen: React.FC<Props> = () => {
  return (
    <Block
      backgroundColor={'pink'}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'NEXT'} />
    </Block>
  );
};

import React from 'react';
import {Block, Button, Colors} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useAppDispatch} from '@hooks';
import {signOut} from '@store';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

export const CarsScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'LOG_OUT'} onPress={() => dispatch(signOut())} />
    </Block>
  );
};

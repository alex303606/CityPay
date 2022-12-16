import React from 'react';
import {Block, Button, Colors} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

export const FinesScreen: React.FC<Props> = () => {
  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'NEXT'} onPress={() => null} />
    </Block>
  );
};

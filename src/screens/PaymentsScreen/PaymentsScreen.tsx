import React from 'react';
import {Block, Button, Colors} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;

export const PaymentsScreen: React.FC<Props> = () => {
  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'PaymentsScreen'} onPress={() => null} />
    </Block>
  );
};

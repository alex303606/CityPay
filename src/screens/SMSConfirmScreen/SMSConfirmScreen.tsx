import React from 'react';
import {Block} from '../../UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigators/navigationTypes';
import {EScreens} from '../../navigators';
import {Button} from 'react-native';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CONFIRM_SCREEN
>;

export const SMSConfirmScreen: React.FC<Props> = ({navigation}) => {
  return (
    <Block
      backgroundColor={'blue'}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'BACk'} onPress={() => navigation.goBack()} />
    </Block>
  );
};

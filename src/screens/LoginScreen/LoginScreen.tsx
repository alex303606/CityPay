import React, {useCallback} from 'react';
import {Button} from 'react-native';
import {Block} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';

type Props = NativeStackScreenProps<AuthStackParamList, EScreens.LOGIN_SCREEN>;

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  const navToSMS = useCallback(() => {
    navigation.navigate(EScreens.SMS_CONFIRM_SCREEN);
  }, [navigation]);

  return (
    <Block
      backgroundColor={'red'}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'NEXT'} onPress={navToSMS} />
    </Block>
  );
};

import React, {useCallback} from 'react';
import {Block} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import {EScreens} from '@navigators';
import {Button} from 'react-native';
import {useAppDispatch} from '@hooks';
import {loginUserSuccess, sendPhone} from '@store';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CONFIRM_SCREEN
>;

export const SMSConfirmScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const logIn = useCallback(async () => {
    await sendPhone();
    dispatch(loginUserSuccess());
  }, [dispatch]);

  return (
    <Block
      backgroundColor={'blue'}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'LOG_IN'} onPress={logIn} />
    </Block>
  );
};

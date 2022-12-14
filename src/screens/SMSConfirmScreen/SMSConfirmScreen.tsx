import React, {useCallback, useRef, useState} from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import {EScreens} from '@navigators';
import {useAppDispatch} from '@hooks';
import {loginUserSuccess} from '@store';
import {useTranslation} from 'react-i18next';
import {CodeFieldComponent} from './components/CodeFieldComponent';
import {ResendCodeButton} from './components/ResendCodeButton';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CONFIRM_SCREEN
>;

export type ICodeFieldComponent = {
  clear: () => void;
};

const CELL_COUNT = 4;
const RESEND_TIMEOUT = 30;

export const SMSConfirmScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [code, setCode] = useState('');
  const codeRef = useRef<ICodeFieldComponent>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const resendCode = useCallback(() => {
    setStartTime(Date.now());
    codeRef.current?.clear();
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const sendCode = useCallback(() => {
    if (code.length === CELL_COUNT) {
      dispatch(loginUserSuccess());
    } else {
      codeRef.current?.clear();
    }
  }, [code.length, dispatch]);

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.R12 marginLeft={5} color={Colors.grey}>
        {t('auth.codeInputLabel')}
      </Typography.R12>
      <Block marginVertical={16}>
        <CodeFieldComponent value={code} setValue={setCode} ref={codeRef} />
      </Block>
      <Button
        disabled={code.length !== CELL_COUNT}
        title={t('auth.apply')}
        onPress={sendCode}
      />
      <Block marginVertical={16}>
        <ResendCodeButton
          startTimeInMillis={startTime}
          timeout={RESEND_TIMEOUT}
          resendCode={resendCode}
        />
      </Block>
      <Block marginVertical={16} alignItems={'center'}>
        <Typography.R16
          onPress={goBack}
          color={Colors.blue}
          paddingVertical={8}>
          {t('auth.changePhone')}
        </Typography.R16>
      </Block>
    </Block>
  );
};

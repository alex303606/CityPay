import React, {useCallback, useRef, useState} from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import {EScreens} from '@navigators';
import {useAppDispatch, useSnackbarNotification} from '@hooks';
import {loginUserSuccess, sendPhone, sendCode} from '@store';
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

export const SMSConfirmScreen: React.FC<Props> = ({navigation, route}) => {
  const {
    params: {phone},
  } = route;
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [code, setCode] = useState('');
  const codeRef = useRef<ICodeFieldComponent>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const {showNotification} = useSnackbarNotification();

  const resendCode = useCallback(async () => {
    const response = await sendPhone(phone);
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (response.data.black_list) {
      return showNotification(t('errors.blackList'));
    }
    if (!response.result) {
      if (response.message) {
        showNotification(response.message);
      }
      return codeRef.current?.clear();
    }
    setStartTime(Date.now());
    codeRef.current?.clear();
  }, [phone, showNotification, t]);

  const goBack = useCallback(() => {
    navigation.navigate(EScreens.LOGIN_SCREEN);
  }, [navigation]);

  const sendCodeHandler = useCallback(async () => {
    if (code.length === CELL_COUNT) {
      const response = await sendCode({
        phone,
        code,
      });
      if (!response?.data) {
        return showNotification(t('errors.somethingWentWrong'));
      }
      if (response.data.black_list) {
        return showNotification(t('errors.blackList'));
      }
      if (!response.result) {
        if (response.message) {
          showNotification(response.message);
        }
        return codeRef.current?.clear();
      }
      dispatch(loginUserSuccess(response.data.user_id));
    }
  }, [code, dispatch, phone, showNotification, t]);

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
        onPress={sendCodeHandler}
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

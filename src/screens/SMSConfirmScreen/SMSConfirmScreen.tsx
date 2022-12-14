import React, {useCallback, useRef, useState} from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import {EScreens} from '@navigators';
import {useAppDispatch} from '@hooks';
import {loginUserSuccess} from '@store';
import {useTranslation} from 'react-i18next';
import {CodeFieldComponent} from './components/CodeFieldComponent';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CONFIRM_SCREEN
>;

export type ICodeFieldComponent = {
  clear: () => void;
};

const CELL_COUNT = 4;

export const SMSConfirmScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [code, setCode] = useState('');
  const codeRef = useRef<ICodeFieldComponent>(null);

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
      <Typography.R12 marginBottom={5} marginLeft={5} color={Colors.grey}>
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
    </Block>
  );
};

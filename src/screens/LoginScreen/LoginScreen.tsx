import React, {useCallback, useState} from 'react';
import {
  Block,
  Button,
  CheckBoxField,
  Colors,
  FocusAwareStatusBar,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {sendPhone} from '@store';
import {useSnackbarNotification, useTheme} from '@hooks';
import CheckBox from '@react-native-community/checkbox';

const MASK = '999 99-99-99';
const PHONE_COUNT = 12;
type Props = NativeStackScreenProps<AuthStackParamList, EScreens.LOGIN_SCREEN>;

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {showNotification} = useSnackbarNotification();
  const [phone, setPhone] = useState<string>('');
  const {t} = useTranslation();
  const sendPhoneHandler = useCallback(async () => {
    const response = await sendPhone(phone);
    if (!response.result) {
      if (response.message) {
        showNotification(response.message);
      } else {
        showNotification(t('errors.somethingWentWrong'));
      }
      return;
    }
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (response.data.black_list) {
      return showNotification(t('errors.blackList'));
    }

    navigation.navigate(EScreens.SMS_CONFIRM_SCREEN, {
      phone,
    });
  }, [navigation, phone, showNotification, t]);

  const changePhoneHandler = useCallback((value: string) => {
    return setPhone(value);
  }, []);

  const [IAmAgree, setIAmAgree] = useState(false);
  const {theme} = useTheme();

  const onChangeIAmAgree = useCallback(
    (value: boolean) => {
      setIAmAgree(value);
    },
    [setIAmAgree],
  );

  return (
    <ScreenContainer title={t('auth.loginRegistration')}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />
      <Typography.R12
        marginBottom={5}
        marginLeft={5}
        numberOfLines={1}
        color={Colors.grey}>
        {t('auth.phoneInputLabel')}
      </Typography.R12>
      <StyledPhoneInput paddingHorizontal={10} marginBottom={32}>
        <DialCode>+996</DialCode>
        <Input
          placeholder={MASK}
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          type={'custom'}
          options={{mask: MASK}}
          onChangeText={changePhoneHandler}
          value={phone}
          autoFocus
        />
      </StyledPhoneInput>
      <Row alignItems={'center'} marginBottom={16}>
        <CheckBox
          value={IAmAgree}
          onValueChange={onChangeIAmAgree}
          tintColors={{
            true: 'rgba(25, 135, 84, 1)',
            false: 'rgba(25, 135, 84, 1)',
          }}
        />
        <Block flex={1} marginHorizontal={8}>
          <Typography.R16 color={theme.textColor}>
            {t('auth.iAmAgree')}
          </Typography.R16>
        </Block>
      </Row>
      <Button
        disabled={phone.length !== PHONE_COUNT || !IAmAgree}
        title={t('auth.getCode')}
        onPress={sendPhoneHandler}
      />
      <Typography.R14 marginTop={32} color={Colors.grey} textAlign={'center'}>
        {t('auth.agree')}
      </Typography.R14>
    </ScreenContainer>
  );
};

const Input = styled(TextInputMask)({
  flex: 1,
  height: 50,
  fontSize: 20,
});

const DialCode = styled(Text)({
  fontSize: 20,
  lineHeight: 48,
  color: Colors.black,
});

const StyledPhoneInput = styled(Row)({
  borderRadius: 10,
  borderColor: Colors.grey,
  borderWidth: 1,
});

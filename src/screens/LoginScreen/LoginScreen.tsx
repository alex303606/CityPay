import React, {useCallback, useState} from 'react';
import {
  Block,
  Button,
  Colors,
  FocusAwareStatusBar,
  Row,
  Typography,
} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const MASK = '999 99-99-99';
const PHONE_COUNT = 12;
type Props = NativeStackScreenProps<AuthStackParamList, EScreens.LOGIN_SCREEN>;

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [phone, setPhone] = useState<string>('');
  const {t} = useTranslation();
  const navToSMS = useCallback(() => {
    navigation.navigate(EScreens.SMS_CONFIRM_SCREEN);
  }, [navigation]);

  const changePhoneHandler = useCallback((value: string) => {
    return setPhone(value);
  }, []);

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('auth.loginRegistration')}
      </Typography.B28>
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
      <Button
        disabled={phone.length !== PHONE_COUNT}
        title={t('auth.getCode')}
        onPress={navToSMS}
      />
      <Typography.R14 marginTop={32} color={Colors.grey} textAlign={'center'}>
        {t('auth.agree')}
      </Typography.R14>
    </Block>
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

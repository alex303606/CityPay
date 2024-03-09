import {Block, Button, InputField, MaskedInput, ScreenContainer} from '@UIKit';
import React, {useCallback, useState} from 'react';
import {useAppSelector, useSnackbarNotification, useTheme} from '@hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {editUserData, getUserState} from '@store';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.PROFILE_SETTINGS_SCREEN
>;

const MASK = '+996 999 99-99-99';

export const ProfileSettingsScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {name, last_name, phone} = useAppSelector(getUserState);
  const [userName, setUserName] = useState<string>(name);
  const [userLastName, setUserLastName] = useState<string>(last_name);
  const [secondName, setSecondName] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(phone);

  const onChangeNameHandler = useCallback((value: string) => {
    setUserName(value);
  }, []);

  const onChangeLastNameHandler = useCallback((value: string) => {
    setUserLastName(value);
  }, []);

  const onChangePhoneNumber = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const onChangeSecondName = useCallback((value: string) => {
    setSecondName(value);
  }, []);

  const onChangePin = useCallback((value: string) => {
    setPin(value);
  }, []);

  const deleteHandler = useCallback(() => {
    navigation.navigate(EScreens.MODAL_DELETE_ACCOUNT_SCREEN);
  }, [navigation]);

  const saveHandler = useCallback(async () => {
    const response = await editUserData({
      phone,
      name: userName,
      lastName: userLastName,
    });
    if (!response) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response.result) {
      if (response.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    navigation.goBack();
  }, [navigation, phone, showNotification, t, userLastName, userName]);

  return (
    <ScreenContainer title={t('profile.editProfile')}>
      <Block flex={1}>
        <InputField
          label={t('profile.name')}
          placeholder={t('profile.name')}
          onChangeValue={onChangeNameHandler}
          marginBottom={16}
          value={userName}
        />
        <InputField
          label={t('profile.lastName')}
          placeholder={t('profile.lastName')}
          onChangeValue={onChangeLastNameHandler}
          marginBottom={16}
          value={userLastName}
        />
        <InputField
          label={t('profile.secondName')}
          placeholder={t('profile.secondName')}
          onChangeValue={onChangeSecondName}
          marginBottom={16}
          value={secondName}
        />
        <InputField
          label={t('profile.pin')}
          placeholder={t('profile.pin')}
          onChangeValue={onChangePin}
          marginBottom={16}
          value={pin}
          keyboardType={'numeric'}
          maxLength={14}
        />
        <MaskedInput
          error={false}
          marginBottom={16}
          title={t('profile.phoneNumber')}
          placeholder={MASK}
          keyboardType="phone-pad"
          mask={MASK}
          changeValueHandler={onChangePhoneNumber}
          value={phoneNumber}
        />
        <Button
          marginVertical={8}
          color={theme.buttonColor}
          title={t('profile.save')}
          onPress={saveHandler}
        />
        <Button
          marginVertical={8}
          color={theme.buttonColor}
          title={t('profile.deleteAccount')}
          onPress={deleteHandler}
        />
      </Block>
    </ScreenContainer>
  );
};

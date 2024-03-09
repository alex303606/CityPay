import {
  Block,
  Button,
  InputComponent,
  MaskedInput,
  ScreenContainer,
} from '@UIKit';
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

  const [errorFieldsState, setErrorFieldsState] = useState<{
    name: boolean;
    lastName: boolean;
    secondName: boolean;
    pin: boolean;
    phoneNumber: boolean;
  }>({
    name: false,
    lastName: false,
    secondName: false,
    pin: false,
    phoneNumber: false,
  });

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
    const newErrorFieldsState = {...errorFieldsState};
    newErrorFieldsState.phoneNumber = !phoneNumber;
    newErrorFieldsState.pin = !pin;
    newErrorFieldsState.name = !userName;
    newErrorFieldsState.lastName = !userLastName;
    newErrorFieldsState.secondName = !secondName;
    setErrorFieldsState(newErrorFieldsState);
    const error = Object.values(newErrorFieldsState).some(err => err);
    if (error) {
      return false;
    }
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
  }, [
    navigation,
    phone,
    showNotification,
    t,
    userLastName,
    userName,
    secondName,
    pin,
    phoneNumber,
  ]);

  return (
    <ScreenContainer title={t('profile.editProfile')}>
      <Block flex={1}>
        <InputComponent
          error={errorFieldsState.name}
          value={userName}
          onChangeValue={onChangeNameHandler}
          title={t('profile.name')}
          marginBottom={16}
        />
        <InputComponent
          error={errorFieldsState.lastName}
          value={userLastName}
          onChangeValue={onChangeLastNameHandler}
          title={t('profile.lastName')}
          marginBottom={16}
        />
        <InputComponent
          error={errorFieldsState.secondName}
          value={secondName}
          onChangeValue={onChangeSecondName}
          title={t('profile.secondName')}
          marginBottom={16}
        />
        <InputComponent
          error={errorFieldsState.pin}
          value={pin}
          onChangeValue={onChangePin}
          title={t('profile.pin')}
          marginBottom={16}
          maxLength={14}
          keyboardType={'numeric'}
        />
        <MaskedInput
          error={errorFieldsState.phoneNumber}
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

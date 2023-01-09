import {Block, Button, InputField, ScreenContainer} from '@UIKit';
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

export const ProfileSettingsScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {name, last_name, phone} = useAppSelector(getUserState);
  const [userName, setUserName] = useState<string>(name);
  const [userLastName, setUserLastName] = useState<string>(last_name);

  const onChangeNameHandler = useCallback((value: string) => {
    setUserName(value);
  }, []);

  const onChangeLastNameHandler = useCallback((value: string) => {
    setUserLastName(value);
  }, []);

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
          label={t('profile.title')}
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
        <Button
          color={theme.buttonColor}
          title={t('profile.save')}
          onPress={saveHandler}
        />
      </Block>
    </ScreenContainer>
  );
};

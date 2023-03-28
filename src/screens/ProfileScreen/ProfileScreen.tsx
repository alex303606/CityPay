import React, {useCallback} from 'react';
import {Block, Button, ScreenContainer} from '@UIKit';
import {EScreens, ProfileStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Header} from './components/Header';
import {Item} from './components/Item';
import {useAppDispatch, useAppSelector, useSnackbarNotification} from '@hooks';
import {
  clearCars,
  clearFines,
  clearPayments,
  clearSettings,
  getUser,
  getUserState,
  getUserSuccess,
  selectedLanguage,
  signOut,
} from '@store';
import {Linking} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const SUPPORT_NUMBER = +996706110024;

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.PROFILE_SCREEN
>;

export const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const dispatch = useAppDispatch();
  const {balls, name, last_name, phone, avatar, isPremiumAccess} =
    useAppSelector(getUserState);

  useFocusEffect(() => {
    reload();
  });

  const reload = useCallback(async () => {
    const response = await getUser(phone);
    if (!response?.result) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (response.data.black_list) {
      dispatch(signOut());
      dispatch(clearFines());
      dispatch(clearCars());
      dispatch(clearPayments());
      dispatch(clearSettings());
      return showNotification(t('errors.blackList'));
    }
    dispatch(
      getUserSuccess({
        ...response.data,
      }),
    );
  }, [dispatch, phone, showNotification, t]);

  const handlePressHeaderButton = useCallback(() => {
    navigation.navigate(EScreens.PROFILE_SETTINGS_SCREEN);
  }, [navigation]);

  const handlePressExit = useCallback(() => {
    navigation.navigate(EScreens.MODAL_EXIT_SCREEN);
  }, [navigation]);

  const handlePressChangeLanguage = useCallback(() => {
    navigation.navigate(EScreens.MODAL_LANGUAGE_SCREEN);
  }, [navigation]);

  const handlePressSupport = useCallback(async () => {
    const url = `whatsapp://send?phone=${SUPPORT_NUMBER}`;
    try {
      await Linking.openURL(url);
    } catch (e) {
      showNotification(t('errors.somethingWentWrong'));
    }
  }, [showNotification, t]);

  const language = useAppSelector(selectedLanguage);

  const handleChangeAvatar = useCallback(async () => {
    return navigation.navigate(EScreens.MODAL_PHOTO_SCREEN);
  }, [navigation]);

  const buyPremiumHandler = useCallback(() => {
    navigation.navigate(EScreens.MODAL_BUY_PREMIUM_SCREEN, {
      title: t('premium.activate'),
    });
  }, [navigation, t]);

  return (
    <ScreenContainer
      reload={reload}
      showButton
      onPressButton={handlePressHeaderButton}
      title={t('profile.title')}>
      <Block flex={1}>
        <Header
          handleChangeAvatar={handleChangeAvatar}
          phone={phone}
          name={name}
          lastName={last_name}
          avatar={avatar}
        />
        <Item text={t('profile.finesPaid')} secondText={String(balls)} />
        <Item
          text={t('profile.accumulatedPoints')}
          secondText={String(balls)}
        />
        <Item text={t('profile.support')} onPress={handlePressSupport} />
        <Item
          text={t('profile.selectLanguage')}
          secondText={t(`profile.${language}`)}
          onPress={handlePressChangeLanguage}
        />
        <Item text={t('profile.exit')} onPress={handlePressExit} />
      </Block>
      {!isPremiumAccess && (
        <Button title={t('premium.activate')} onPress={buyPremiumHandler} />
      )}
    </ScreenContainer>
  );
};

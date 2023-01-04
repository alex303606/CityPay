import React, {useCallback} from 'react';
import {Block, ScreenContainer} from '@UIKit';
import {EScreens, ProfileStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Header} from './components/Header';
import {Item} from './components/Item';
import {useAppSelector, useSnackbarNotification} from '@hooks';
import {selectedLanguage} from '@store';
import {Linking} from 'react-native';

const SUPPORT_NUMBER = +996706110024;

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.PROFILE_SCREEN
>;

export const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();

  //const {theme} = useTheme();

  const handlePressHeaderButton = useCallback(() => {
    return null;
  }, []);

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

  return (
    <ScreenContainer
      showButton
      onPressButton={handlePressHeaderButton}
      title={t('profile.title')}>
      <Block flex={1}>
        <Header />
        <Item text={t('profile.finesPaid')} secondText={'10'} />
        <Item text={t('profile.accumulatedPoints')} secondText={'10'} />
        <Item text={t('profile.support')} onPress={handlePressSupport} />
        <Item
          text={t('profile.selectLanguage')}
          secondText={t(`profile.${language}`)}
          onPress={handlePressChangeLanguage}
        />
        <Item text={t('profile.exit')} onPress={handlePressExit} />
      </Block>
    </ScreenContainer>
  );
};

import React, {useCallback} from 'react';
import {Image} from 'react-native';
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
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@hooks';
import {changeLanguage, ILanguages, selectedLanguage} from '@store';
import DeviceInfo from 'react-native-device-info';
const logo = require('@assets/images/logo.webp');

type Props = NativeStackScreenProps<
  AuthStackParamList,
  EScreens.INITIAL_SCREEN
>;

const version = DeviceInfo.getVersion();

export const InitialScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();

  const changeLanguageHandler = useCallback(
    async (lang: ILanguages) => {
      dispatch(changeLanguage(lang));
      await i18n.changeLanguage(lang);
      navigation.navigate(EScreens.LOGIN_SCREEN);
    },
    [dispatch, i18n, navigation],
  );

  const language = useAppSelector(selectedLanguage);
  const isRUSelected = language === 'ru';

  return (
    <Block
      backgroundColor={Colors.blue}
      flex={1}
      paddingVertical={32}
      paddingHorizontal={16}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.blue}
        barStyle="light-content"
      />
      <Row flex={1} justifyContent={'center'}>
        <StyledImage resizeMode="contain" source={logo} />
      </Row>
      <Block flex={1} justifyContent={'flex-end'}>
        <Row marginBottom={16} justifyContent={'center'}>
          <Typography.R18
            paddingRight={16}
            numberOfLines={1}
            color={Colors.white}>
            {t('version')}
          </Typography.R18>
          <Typography.R18 numberOfLines={1} color={Colors.white}>
            {version}
          </Typography.R18>
        </Row>
        <Button
          marginVertical={8}
          textColor={isRUSelected ? Colors.black : Colors.white}
          color={isRUSelected ? Colors.white : Colors.darkBlue}
          title={t('languages.ru')}
          onPress={() => changeLanguageHandler(ILanguages.ru)}
        />
        <Button
          marginVertical={8}
          textColor={isRUSelected ? Colors.white : Colors.black}
          color={isRUSelected ? Colors.darkBlue : Colors.white}
          title={t('languages.kg')}
          onPress={() => changeLanguageHandler(ILanguages.kg)}
        />
        <Button
          marginVertical={8}
          textColor={isRUSelected ? Colors.white : Colors.black}
          color={isRUSelected ? Colors.darkBlue : Colors.white}
          title={t('languages.en')}
          onPress={() => changeLanguageHandler(ILanguages.en)}
        />
      </Block>
    </Block>
  );
};

const StyledImage = styled(Image)({
  width: 250,
});

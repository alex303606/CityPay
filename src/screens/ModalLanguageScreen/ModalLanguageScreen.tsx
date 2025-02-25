import React, {useCallback} from 'react';
import {Block, Button, ModalContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@hooks';
import {changeLanguage, ILanguages} from '@store';
import {EScreens, ProfileStackParamList} from '@navigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MODAL_LANGUAGE_SCREEN
>;

export const ModalLanguageScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();

  const changeLanguageHandler = useCallback(
    async (lang: ILanguages) => {
      dispatch(changeLanguage(lang));
      await i18n.changeLanguage(lang);
      navigation.goBack();
    },
    [dispatch, i18n, navigation],
  );

  return (
    <ModalContainer title={t('profile.selectLanguage')}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('languages.ru')}
          onPress={() => changeLanguageHandler(ILanguages.ru)}
        />
        <Button
          marginVertical={8}
          title={t('languages.kg')}
          onPress={() => changeLanguageHandler(ILanguages.kg)}
        />
        <Button
          marginVertical={8}
          title={t('languages.en')}
          onPress={() => changeLanguageHandler(ILanguages.en)}
        />
      </Block>
    </ModalContainer>
  );
};

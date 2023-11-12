import React from 'react';
import {Block, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.DOCUMENTS_SCREEN
>;

export const DocumentsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('osago.documentsScreen.title')}>
      <Block flex={1} backgroundColor={'red'}></Block>
    </ScreenContainer>
  );
};

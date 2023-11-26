import React from 'react';
import {Block, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';

export const InfoPaymentScreen = () => {
  const {t} = useTranslation();
  return (
    <ScreenContainer title={t('osago.infoPaymentScreen.title')}>
      <Block flex={1} backgroundColor={'red'}></Block>
    </ScreenContainer>
  );
};

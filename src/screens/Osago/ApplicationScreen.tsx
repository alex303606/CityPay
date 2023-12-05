import React from 'react';
import {Block, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';

export const ApplicationScreen = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer scroll={false} title={t('osago.infoPaymentScreen.title')}>
      <Block flex={1} backgroundColor={'red'}></Block>
    </ScreenContainer>
  );
};

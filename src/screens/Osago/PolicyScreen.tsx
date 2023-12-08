import React from 'react';
import {Block, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';

type Props = {};

export const PolicyScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('osago.policyScreen.title')}>
      <Block flex={1} backgroundColor={'red'}></Block>
    </ScreenContainer>
  );
};

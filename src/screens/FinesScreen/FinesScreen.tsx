import React from 'react';
import {ScreenContainer} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

export const FinesScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('fines.title')}>
      <EmptyList />
    </ScreenContainer>
  );
};

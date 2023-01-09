import React from 'react';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {ScreenContainer} from '@UIKit';
import {EmptyList} from './components/EmptyList';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

export const CarsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('cars.title')}>
      <EmptyList />
    </ScreenContainer>
  );
};

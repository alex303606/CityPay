import React from 'react';
import {Button, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarCheckStackParamList, EScreens} from '@navigators';
import {getCarCheck} from '@store';
import {useAppSelector} from '@hooks';

type Props = NativeStackScreenProps<
  CarCheckStackParamList,
  EScreens.CAR_CHECK_RESULT_SCREEN
>;

export const CarCheckResultScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const carCheck = useAppSelector(getCarCheck);
  console.log('carCheck:', carCheck);
  return (
    <ScreenContainer title={t('carCheck.carCheckResultTitle')}>
      <Button title={t('carCheck.search')} onPress={() => null} />
    </ScreenContainer>
  );
};

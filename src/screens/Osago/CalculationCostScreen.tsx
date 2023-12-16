import {Block, ScreenContainer} from '@UIKit';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.CALCULATION_COST_SCREEN
>;

export const CalculationCostScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const {
    total: {bankPercent, nsp, totalSum, baseSum, calcList, deliveryPrice},
  } = route.params;

  return (
    <ScreenContainer title={t('osago.calculationCostScreen.title')}>
      <Block flex={1} backgroundColor={'red'}></Block>
    </ScreenContainer>
  );
};

import {Block, CalculationCostItem, ScreenContainer} from '@UIKit';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import styled from 'styled-components';
import {Image} from 'react-native';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.CALCULATION_COST_SCREEN
>;

export const CalculationCostScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const {
    partner,
    total: {bankPercent, totalSum, baseSum, calcList, deliveryPrice},
  } = route.params;
  console.log(route.params.total);
  return (
    <ScreenContainer title={t('osago.calculationCostScreen.title')}>
      <StyledImage source={{uri: partner.logoUrl}} />
      <Block marginTop={32}>
        {calcList.map(c => {
          return (
            <CalculationCostItem
              subTitle={c.description}
              title={c.title}
              value={c.param}
            />
          );
        })}
        {!!deliveryPrice ? (
          <CalculationCostItem
            title={'Стоимость доставки:'}
            value={deliveryPrice}
          />
        ) : null}
        <CalculationCostItem title={'Базовая стоимость:'} value={baseSum} />
        <CalculationCostItem
          title={'Комиссия за эквайринг:'}
          value={bankPercent}
        />
        <CalculationCostItem
          title={'Итоговая стоимость полиса:'}
          value={totalSum}
        />
      </Block>
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});

import React, {useCallback} from 'react';
import {Block, Button, Row, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarCheckStackParamList, EScreens} from '@navigators';
import {getCarCheck} from '@store';
import {useAppSelector, useTheme} from '@hooks';
import styled from 'styled-components';

type Props = NativeStackScreenProps<
  CarCheckStackParamList,
  EScreens.CAR_CHECK_RESULT_SCREEN
>;

type LineProps = {
  title: string;
  param: string;
};

type PeriodProps = {
  dateFrom: string;
  dateTo: string;
};

const CarLine: React.FC<LineProps> = ({title, param}) => {
  const {theme} = useTheme();

  return (
    <Block marginBottom={16}>
      <StyledB color={theme.textColor}>{title}:</StyledB>
      <Typography.RF16 color={theme.paramColor}>{param}</Typography.RF16>
    </Block>
  );
};

const PeriodLine: React.FC<PeriodProps> = ({dateFrom, dateTo}) => {
  const {theme} = useTheme();

  return (
    <Row marginBottom={8}>
      <Typography.RF16 color={theme.paramColor}>
        с {dateFrom} по{' '}
      </Typography.RF16>
      <Typography.RF16 color={theme.paramColor}>{dateTo}</Typography.RF16>
    </Row>
  );
};

export const CarCheckResultScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {car, periods, paidVersionAvalible} = useAppSelector(getCarCheck);

  const advancedSearchHandler = useCallback(() => {
    return;
  }, []);

  return (
    <ScreenContainer title={t('carCheck.carCheckResultTitle')}>
      <Block flex={1} marginBottom={32}>
        <Block marginBottom={32}>
          {car.map(({title, param}) => (
            <CarLine title={title} param={param} />
          ))}
        </Block>
        <Block>
          <Typography.B16 marginBottom={4} color={theme.textColor}>
            {t('carCheck.holdingPeriod')}
          </Typography.B16>
          {periods.map(({dateFrom, dateTo}) => (
            <PeriodLine dateFrom={dateFrom} dateTo={dateTo} />
          ))}
        </Block>
      </Block>
      {paidVersionAvalible ? (
        <Button
          title={t('carCheck.advancedSearch')}
          onPress={advancedSearchHandler}
        />
      ) : null}
    </ScreenContainer>
  );
};

const StyledB = styled(Typography.B16)({
  lineHeight: 16,
});

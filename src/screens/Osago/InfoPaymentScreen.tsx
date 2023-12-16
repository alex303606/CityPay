import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Block, InfoLIneRow, Row, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {useAppSelector, useGetTotalSum, useTheme} from '@hooks';
import {getPeriodList, ITotal} from '@store';
import styled from 'styled-components';
import {Image} from 'react-native';
import {DriverApplicationItem} from './components/DriverApplicationItem';
import {IDriver} from './ApplicationScreen';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.INFO_PAYMENTS_SCREEN
>;

export const InfoPaymentScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {driversState, state, partner} = route.params;
  const {theme} = useTheme();
  const periodList = useAppSelector(getPeriodList);
  const period = useMemo(() => {
    return periodList.find(p => p.id === state.validity);
  }, [periodList, state.validity]);

  console.log('STATE', state);
  const {getTotalSumHandler} = useGetTotalSum({
    isHasToCard: state.iHaveCard,
    isKgRegistrations: state.carRegisteredInKr,
    partnerId: partner.id,
    productId: state.numberOfDrivers,
    selectedPeriodId: state.validity,
  });

  const [total, setTotal] = useState<ITotal | null>(null);

  const getTotal = useCallback(async () => {
    const data = await getTotalSumHandler();
    if (data) {
      setTotal(data);
    }
  }, []);

  useEffect(() => {
    getTotal();
  }, [getTotal]);

  console.log('total:', total);

  if (!total) {
    return null;
  }

  return (
    <ScreenContainer title={t('osago.infoPaymentScreen.title')}>
      <Row marginBottom={16} justifyContent={'space-between'}>
        <StyledImage source={{uri: partner.logoUrl}} />
        <Block alignItems={'flex-end'}>
          <Typography.B16 color={theme.textColor}>
            {t('osago.infoPaymentScreen.status')}
          </Typography.B16>
          <Typography.R18 color={theme.textColor}>
            {t('osago.infoPaymentScreen.amountInsurance')}
          </Typography.R18>
          <Typography.R24 marginBottom={4} color={'#2F80ED'}>
            {total.totalSum} сом
          </Typography.R24>
        </Block>
      </Row>
      <Typography.B18 marginBottom={8} color={'#2F80ED'}>
        {t('osago.infoPaymentScreen.totalInformation')}
      </Typography.B18>
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.insuranceType')}
        value={'ОСАГО'}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.numberDrivers')}
        value={driversState.length}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.insurancePeriod')}
        value={period?.title || ''}
      />
      <InfoLIneRow title={'Email:'} value={state.email} />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.phoneNumber')}
        value={state.phone}
      />
      {driversState.map((driver, index) => (
        <DriverApplicationItem driver={driver} key={index} index={index} />
      ))}
      {/*<Typography.B18 marginBottom={8} color={'#2F80ED'}>*/}
      {/*  {t('osago.infoPaymentScreen.carData')}*/}
      {/*</Typography.B18>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.carModel')}*/}
      {/*  value={application.carVendor}*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.model')}*/}
      {/*  value={application.carModel}*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.yearOfIssue')}*/}
      {/*  value={application.carYear}*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.carType')}*/}
      {/*  value={application.carTypeTitle}*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.engineCapacity')}*/}
      {/*  value={application.carTypeSelectedParameterTitle}*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.engineNumber')}*/}
      {/*  value={application.carVIN}*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.countryRegistration')}*/}
      {/*  value={*/}
      {/*    application.isKGRegistrations*/}
      {/*      ? t('osago.infoPaymentScreen.yes')*/}
      {/*      : t('osago.infoPaymentScreen.no')*/}
      {/*  }*/}
      {/*/>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.technicalInspection')}*/}
      {/*  value={*/}
      {/*    application.isHasTOCard*/}
      {/*      ? t('osago.infoPaymentScreen.yes')*/}
      {/*      : t('osago.infoPaymentScreen.no')*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>*/}
      {/*  {t('osago.infoPaymentScreen.policyInfo')}*/}
      {/*</Typography.B18>*/}
      {/*<InfoLIneRow*/}
      {/*  title={t('osago.infoPaymentScreen.delivery')}*/}
      {/*  value={*/}
      {/*    application.isNeedDelivery*/}
      {/*      ? t('osago.infoPaymentScreen.yes')*/}
      {/*      : t('osago.infoPaymentScreen.no')*/}
      {/*  }*/}
      {/*/>*/}
      {/*{!!application.deliveryAddress ? (*/}
      {/*  <InfoLIneRow*/}
      {/*    title={t('osago.infoPaymentScreen.deliveryAddress')}*/}
      {/*    value={application.deliveryAddress}*/}
      {/*  />*/}
      {/*) : null}*/}
      {/*{application.pickupBranch ? (*/}
      {/*  <InfoLIneRow*/}
      {/*    title={t('osago.infoPaymentScreen.placeReceipt')}*/}
      {/*    value={`${application.pickupBranch.title}\n${application.pickupBranch.address}\n${application.pickupBranch.phone}`}*/}
      {/*  />*/}
      {/*) : null}*/}
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});

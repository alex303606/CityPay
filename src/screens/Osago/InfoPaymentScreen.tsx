import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Block,
  Button,
  InfoLIneRow,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {
  useAppSelector,
  useCreateNewApplication,
  useGetSupportUrls,
  useGetTotalSum,
  useTheme,
} from '@hooks';
import {
  getCarTypesList,
  getDeliveryList,
  getInsuranceTypeList,
  getOfficesList,
  getPeriodList,
  ITotal,
} from '@store';
import styled from 'styled-components';
import {Image} from 'react-native';
import {DriverApplicationItem} from './components/DriverApplicationItem';
import {IDriverApplicationItem} from './ApplicationScreen';
import CheckBox from '@react-native-community/checkbox';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.INFO_PAYMENTS_SCREEN
>;

export const InfoPaymentScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {driversState, state, partner, driversPhotos, carPhotos} = route.params;
  const {theme} = useTheme();
  const periodList = useAppSelector(getPeriodList);
  const carTypesList = useAppSelector(getCarTypesList);
  const officesList = useAppSelector(getOfficesList);
  const insuranceTypeList = useAppSelector(getInsuranceTypeList);
  const deliveryList = useAppSelector(getDeliveryList);

  const isDelivery = useMemo(() => {
    const delivery = deliveryList.find(
      delivery => delivery.id === state.deliveryId,
    );
    return !!delivery?.isDelivery;
  }, []);

  const period = useMemo(() => {
    return periodList.find(p => p.id === state.selectedPeriodId);
  }, [periodList, state.selectedPeriodId]);

  const carTypeTitle = useMemo(() => {
    return carTypesList.find(type => type.id === state.carType);
  }, [carTypesList, state.carType]);

  const office = useMemo(() => {
    return officesList.find(office => office.id === state.pickUpOffice);
  }, []);

  const insuranceType = useMemo(() => {
    return insuranceTypeList.find(
      insurance => insurance.id === state.insuranceTypeId,
    );
  }, []);

  const {getTotalSumHandler} = useGetTotalSum({
    isHasToCard: state.isHasToCard,
    isKgRegistrations: state.isKgRegistration,
    partnerId: partner.id,
    productId: state.numberOfDrivers,
    selectedPeriodId: state.selectedPeriodId,
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

  const drivers: IDriverApplicationItem[] = useMemo(() => {
    return driversState.map(driver => {
      return {
        firstName: driver.name,
        surname: driver.secondName,
        lastName: driver.surname,
        pin: driver.pin,
        driveLicenseDate: driver.driverLicenseDate.toLocaleDateString(),
        class: driver.class,
        bithday: driver.date.toLocaleDateString(),
        isOwner: state.isOwner,
      };
    });
  }, [driversState]);

  const [iAmAgree, setIAmAgree] = useState<boolean>(false);

  const {insuranceTerms, insuranceConditions} = useGetSupportUrls();

  const onPressRules = useCallback(() => {
    navigation.navigate(EScreens.WEBVIEW_SCREEN, {
      uri: insuranceTerms,
      title: t('osago.statementScreen.rulesTitle'),
    });
  }, [insuranceTerms]);

  const onPressConditions = useCallback(() => {
    navigation.navigate(EScreens.WEBVIEW_SCREEN, {
      uri: insuranceConditions,
      title: t('osago.statementScreen.conditionsTitle'),
    });
  }, [insuranceConditions]);

  const {createNewApplicationHandler, loading} = useCreateNewApplication({
    driversState,
    state,
    partner,
    driversPhotos,
    carPhotos,
  });

  const onHandlePressPayByMBank = useCallback(() => {
    createNewApplicationHandler();
  }, [createNewApplicationHandler]);

  const onChangeIAmAgree = useCallback(
    (value: boolean) => setIAmAgree(value),
    [iAmAgree],
  );

  const onPressMore = useCallback(() => {
    if (total) {
      navigation.navigate(EScreens.CALCULATION_COST_SCREEN, {total, partner});
    }
  }, [total]);

  if (!total) {
    return null;
  }

  return (
    <ScreenContainer title={t('osago.infoPaymentScreen.title')}>
      <Row marginBottom={16} justifyContent={'space-between'}>
        <StyledImage resizeMode={'contain'} source={{uri: partner.logoUrl}} />
        <Block alignItems={'flex-end'}>
          <Typography.R18 color={theme.textColor}>
            {t('osago.infoPaymentScreen.amountInsurance')}
          </Typography.R18>
          <Typography.R24 marginBottom={4} color={'#2F80ED'}>
            {total.totalSum}
          </Typography.R24>
          <Typography.B16
            marginBottom={4}
            onPress={onPressMore}
            color={'#EB5757'}>
            {t('osago.infoPaymentScreen.more')}
          </Typography.B16>
        </Block>
      </Row>
      <Typography.B18 marginBottom={8} color={'#2F80ED'}>
        {t('osago.infoPaymentScreen.totalInformation')}
      </Typography.B18>
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.insuranceType')}
        value={insuranceType?.title || ''}
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
        value={state.contactPhone}
      />
      {drivers.map((driver, index) => (
        <DriverApplicationItem driver={driver} key={index} index={index} />
      ))}
      <Typography.B18 marginBottom={8} color={'#2F80ED'}>
        {t('osago.infoPaymentScreen.carData')}
      </Typography.B18>
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carModel')}
        value={state.carVendor}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.model')}
        value={state.carModel}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carNumber')}
        value={state.carNumber}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.yearOfIssue')}
        value={state.carYear}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carType')}
        value={carTypeTitle?.title || ''}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.engineCapacity')}
        value={state.engineCapacity}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carVin')}
        value={state.carVin}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carRegisteredInKr')}
        value={
          state.isKgRegistration
            ? t('osago.infoPaymentScreen.yes')
            : t('osago.infoPaymentScreen.no')
        }
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.technicalInspection')}
        value={
          state.isHasToCard
            ? t('osago.infoPaymentScreen.yes')
            : t('osago.infoPaymentScreen.no')
        }
      />
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        {t('osago.infoPaymentScreen.receiptinfo')}
      </Typography.B18>
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.delivery')}
        value={
          isDelivery
            ? t('osago.infoPaymentScreen.yes')
            : t('osago.infoPaymentScreen.no')
        }
      />
      {!!state.deliveryAddress && isDelivery ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.deliveryAddress')}
          value={state.deliveryAddress}
        />
      ) : null}
      {office && !isDelivery ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.placeReceipt')}
          value={`${office.title}\n${office.address}\n${office.phone}`}
        />
      ) : null}
      <Row alignItems={'center'} marginBottom={16}>
        <Block flex={1} marginRight={24}>
          <Typography.R16 color={theme.textColor}>
            {t('osago.statementScreen.IRead')}
          </Typography.R16>
          <Typography.R16 color={theme.textColor}>
            <Typography.B16
              color={theme.textColor}
              style={{
                textDecorationLine: 'underline',
              }}
              onPress={onPressRules}>
              {t('osago.statementScreen.rules')}
            </Typography.B16>

            <Typography.R16 color={theme.textColor}>
              {t('osago.statementScreen.and')}
            </Typography.R16>

            <Typography.B16
              color={theme.textColor}
              style={{
                textDecorationLine: 'underline',
              }}
              onPress={onPressConditions}>
              {t('osago.statementScreen.conditions')}
            </Typography.B16>
          </Typography.R16>

          <Typography.R16 color={theme.textColor}>
            {t('osago.statementScreen.registration')}
          </Typography.R16>
        </Block>
        <CheckBox
          value={iAmAgree}
          onValueChange={onChangeIAmAgree}
          tintColors={{
            true: 'rgba(25, 135, 84, 1)',
            false: 'rgba(25, 135, 84, 1)',
          }}
        />
      </Row>
      <Button
        loading={loading}
        disabled={!iAmAgree}
        marginVertical={8}
        title={t('osago.infoPaymentScreen.pay')}
        onPress={onHandlePressPayByMBank}
      />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});

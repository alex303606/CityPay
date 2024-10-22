import React, {useEffect, useMemo} from 'react';
import {Block, InfoLIneRow, Row, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {useAppSelector, useTheme} from '@hooks';
import {getApplicationById, IApplication} from '@store';
import styled from 'styled-components';
import {Alert, Image} from 'react-native';
import {DriverApplicationItem} from './components/DriverApplicationItem';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.APPLICATION_SCREEN
>;

export type IDriverApplicationItem = {
  firstName: string;
  surname: string;
  lastName: string;
  pin: string;
  driveLicenseDate: string | null;
  class: string;
  bithday: string;
  isOwner: boolean;
};

const getDrivers = (
  item: IApplication,
  anotherDriversCount: number,
): IDriverApplicationItem[] => {
  return [...Array(anotherDriversCount + 1)].map(
    (_, index): IDriverApplicationItem => {
      return {
        // @ts-ignore
        firstName: item[`driver${index + 1}Firstname`],
        // @ts-ignore
        surname: item[`driver${index + 1}Surname`],
        // @ts-ignore
        lastName: item[`driver${index + 1}Lastname`],
        // @ts-ignore
        pin: item[`driver${index + 1}Pin`],
        // @ts-ignore
        driveLicenseDate: item[`driver${index + 1}DriveLicenseDate`],
        // @ts-ignore
        class: item[`driver${index + 1}Class`],
        // @ts-ignore
        bithday: item[`driver${index + 1}Bithday`],
        isOwner: item.isOwner,
      } as IDriverApplicationItem;
    },
  );
};

export const ApplicationScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {id} = route.params;
  const application = useAppSelector(getApplicationById(id));
  const {theme} = useTheme();

  useEffect(() => {
    if (application?.status === 'Отклонена') {
      Alert.alert(
        application.cancelInformation,
        t('osago.infoPaymentScreen.cancelInformationDescription'),
      );
    }
  }, [application?.status]);

  const drivers = useMemo(() => {
    if (application && application?.anotherDriversCount >= 0) {
      return getDrivers(application, application?.anotherDriversCount);
    }

    return [];
  }, [application]);

  if (!application) {
    return null;
  }

  return (
    <ScreenContainer title={t('osago.infoPaymentScreen.title')}>
      <Row marginBottom={16} justifyContent={'space-between'}>
        <StyledImage source={{uri: application.selectedPartner.logoUrl}} />
        <Block alignItems={'flex-end'}>
          <Typography.B16 color={theme.textColor}>
            {t('osago.infoPaymentScreen.status')}
          </Typography.B16>
          <Typography.B16
            color={application.status === 'Отклонена' ? '#EB5757' : '#219653'}>
            {application.status}
          </Typography.B16>
          <Typography.R18 color={theme.textColor}>
            {t('osago.infoPaymentScreen.amountInsurance')}
          </Typography.R18>
          <Typography.R24 marginBottom={4} color={'#2F80ED'}>
            {application.paymentSum} сом
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
        value={application.anotherDriversCount + 1}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.insurancePeriod')}
        value={application.period.title}
      />
      <InfoLIneRow title={'Email:'} value={application.contactEmail} />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.phoneNumber')}
        value={application.contactPhone}
      />
      {drivers.map((driver, index) => (
        <DriverApplicationItem driver={driver} key={index} index={index} />
      ))}
      <Typography.B18 marginBottom={8} color={'#2F80ED'}>
        {t('osago.infoPaymentScreen.carData')}
      </Typography.B18>
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carModel')}
        value={application.carVendor}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.model')}
        value={application.carModel}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.yearOfIssue')}
        value={application.carYear}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carType')}
        value={application.carTypeTitle}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.engineCapacity')}
        value={application.carTypeSelectedParameterTitle}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.carVin')}
        value={application.carVIN}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.countryRegistration')}
        value={
          application.isKGRegistrations
            ? t('osago.infoPaymentScreen.yes')
            : t('osago.infoPaymentScreen.no')
        }
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.technicalInspection')}
        value={
          application.isHasTOCard
            ? t('osago.infoPaymentScreen.yes')
            : t('osago.infoPaymentScreen.no')
        }
      />
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        {t('osago.infoPaymentScreen.policyInfo')}
      </Typography.B18>
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.delivery')}
        value={
          application.isNeedDelivery
            ? t('osago.infoPaymentScreen.yes')
            : t('osago.infoPaymentScreen.no')
        }
      />
      {!!application.deliveryAddress ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.deliveryAddress')}
          value={application.deliveryAddress}
        />
      ) : null}
      {application.pickupBranch ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.placeReceipt')}
          value={`${application.pickupBranch.title}\n${application.pickupBranch.address}\n${application.pickupBranch.phone}`}
        />
      ) : null}
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});

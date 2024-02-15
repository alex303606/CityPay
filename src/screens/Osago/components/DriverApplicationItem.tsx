import {Block, InfoLIneRow, Typography} from '@UIKit';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {IDriverApplicationItem} from '../ApplicationScreen';

type Props = {
  index: number;
  driver: IDriverApplicationItem;
};

export const DriverApplicationItem: React.FC<Props> = ({index, driver}) => {
  const {t} = useTranslation();

  return (
    <Block>
      {index === 0 ? (
        <Typography.B18 marginBottom={8} color={'#2F80ED'}>
          {t('osago.infoPaymentScreen.policyholder')}
        </Typography.B18>
      ) : (
        <Typography.B18 marginBottom={8} color={'#2F80ED'}>
          {t('osago.infoPaymentScreen.driver', {number: index + 1})}
        </Typography.B18>
      )}
      {index === 0 ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.isOwner')}
          value={
            driver.isOwner
              ? t('osago.infoPaymentScreen.yes')
              : t('osago.infoPaymentScreen.no')
          }
        />
      ) : null}
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.lastName')}
        value={driver.lastName}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.firstName')}
        value={driver.firstName}
      />
      {driver.surname ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.surname')}
          value={driver.surname}
        />
      ) : null}
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.bithday')}
        value={driver.bithday}
      />
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.pin')}
        value={driver.pin}
      />
      {!!driver.driveLicenseDate ? (
        <InfoLIneRow
          title={t('osago.infoPaymentScreen.driveLicenseDate')}
          value={driver.driveLicenseDate}
        />
      ) : null}
      <InfoLIneRow
        title={t('osago.infoPaymentScreen.driverClass')}
        value={driver.class}
      />
    </Block>
  );
};

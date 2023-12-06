import {Block, InfoLIneRow, Typography} from '@UIKit';
import React from 'react';
import {IDriver} from '../ApplicationScreen';
import {useTranslation} from 'react-i18next';

type Props = {
  index: number;
  driver: IDriver;
};

export const DriverApplicationItem: React.FC<Props> = ({index, driver}) => {
  const {t} = useTranslation();

  return (
    <Block>
      {index === 0 ? (
        <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
          {t('osago.infoPaymentScreen.policyholder')}
        </Typography.B18>
      ) : (
        <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
          {t('osago.infoPaymentScreen.driver', {number: index + 1})}
        </Typography.B18>
      )}
      {index === 0 ? (
        <InfoLIneRow
          title={'Заявитель является собственником:'}
          value={
            driver.isOwner
              ? t('osago.infoPaymentScreen.yes')
              : t('osago.infoPaymentScreen.no')
          }
        />
      ) : null}
      <InfoLIneRow title={'Фамилия:'} value={driver.surname} />
      <InfoLIneRow title={'Имя:'} value={driver.firstName} />
      <InfoLIneRow title={'Отчество:'} value={driver.lastName} />
      <InfoLIneRow title={'Дата рождения:'} value={driver.bithday} />
      <InfoLIneRow title={'ПИН / ИНН:'} value={driver.pin} />
      {!!driver.driveLicenseDate ? (
        <InfoLIneRow title={'Стаж с:'} value={driver.driveLicenseDate} />
      ) : null}
      <InfoLIneRow title={'Номер ВУ:'} value={'________'} />
      <InfoLIneRow title={'Класс водителя:'} value={driver.class} />
    </Block>
  );
};

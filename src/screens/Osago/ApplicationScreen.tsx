import React, {useCallback, useMemo} from 'react';
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

export type IDriver = {
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
): IDriver[] => {
  return [...Array(anotherDriversCount + 1)].map((_, index): IDriver => {
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
    } as IDriver;
  });
};

export const ApplicationScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {id} = route.params;
  const application = useAppSelector(getApplicationById(id));
  const {theme} = useTheme();

  console.log(application);

  const onPressAbout = useCallback(() => {
    Alert.alert('about');
  }, []);

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
          <Typography.R18 color={theme.textColor} marginBottom={4}>
            Сумма страховки:
          </Typography.R18>
          <Typography.R24 marginBottom={4} color={'rgba(47, 128, 237, 1)'}>
            {application.paymentSum} сом
          </Typography.R24>
          <Typography.B16 onPress={onPressAbout} color={'rgba(235, 87, 87, 1)'}>
            Подробнее
          </Typography.B16>
        </Block>
      </Row>
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        Общие данные
      </Typography.B18>
      <InfoLIneRow title={'Вид страхования:'} value={'ОСАГО'} />
      <InfoLIneRow
        title={'Количество водителей:'}
        value={application.anotherDriversCount + 1}
      />
      <InfoLIneRow
        title={'Период страхования:'}
        value={application.period.title}
      />
      <InfoLIneRow title={'Email:'} value={application.contactEmail} />
      <InfoLIneRow title={'Номер телефона:'} value={application.contactPhone} />
      {drivers.map((driver, index) => (
        <DriverApplicationItem driver={driver} key={index} index={index} />
      ))}
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        Данные об автомобиле
      </Typography.B18>
      <InfoLIneRow title={'Марка авто:'} value={application.carVendor} />
      <InfoLIneRow title={'Модель:'} value={application.carModel} />
      <InfoLIneRow title={'Год выпуска:'} value={application.carYear} />
      <InfoLIneRow title={'Тип авто:'} value={application.carTypeTitle} />
      <InfoLIneRow
        title={'Объем двигателя:'}
        value={application.carTypeSelectedParameterTitle}
      />
      <InfoLIneRow title={'Мощность электродвигателя:'} value={'Да'} />
      <InfoLIneRow title={'Грузоподъемность:'} value={'Да'} />
      <InfoLIneRow title={'Номер двигателя:'} value={'Да'} />
      <InfoLIneRow
        title={'Страна регистрации:'}
        value={application.isKGRegistrations ? 'Кыргыстан' : 'Нет'}
      />
      <InfoLIneRow title={'Техосмотр:'} value={'Да'} />
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        Информация о полисе
      </Typography.B18>
      <InfoLIneRow
        title={'Доставка:'}
        value={application.isNeedDelivery ? 'Yes' : 'No'}
      />
      {!!application.deliveryAddress ? (
        <InfoLIneRow
          title={'Адрес доставки:'}
          value={application.deliveryAddress}
        />
      ) : null}
      <InfoLIneRow
        title={'Место получения полиса:'}
        value={'Главный офис, г.Ош, ул. М. Горького 100А. 996700332211'}
      />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});

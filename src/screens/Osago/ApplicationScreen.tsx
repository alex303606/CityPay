import React, {useCallback} from 'react';
import {Block, InfoLIneRow, Row, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {useAppSelector, useTheme} from '@hooks';
import {getApplicationById} from '@store';
import styled from 'styled-components';
import {Alert, Image} from 'react-native';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.APPLICATION_SCREEN
>;

export const ApplicationScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {id} = route.params;
  const application = useAppSelector(getApplicationById(id));
  const {theme} = useTheme();

  console.log(application);

  const onPressAbout = useCallback(() => {
    Alert.alert('about');
  }, []);

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
            2750 сом
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
      <InfoLIneRow title={'Количество водителей:'} value={'ОСАГО'} />
      <InfoLIneRow title={'Период страхования:'} value={'ОСАГО'} />
      <InfoLIneRow title={'Email:'} value={'ОСАГО'} />
      <InfoLIneRow title={'Номер телефона:'} value={'ОСАГО'} />
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        Водитель/страхователь
      </Typography.B18>
      <InfoLIneRow title={'Заявитель является собственником:'} value={'Да'} />
      <InfoLIneRow title={'Фамилия:'} value={'Да'} />
      <InfoLIneRow title={'Имя:'} value={'Да'} />
      <InfoLIneRow title={'Отчество:'} value={'Да'} />
      <InfoLIneRow title={'Дата рождения:'} value={'Да'} />
      <InfoLIneRow title={'ПИН / ИНН:'} value={'Да'} />
      <InfoLIneRow title={'Номер ВУ:'} value={'Да'} />
      <InfoLIneRow title={'Номер ВУ:'} value={'Да'} />
      <InfoLIneRow title={'Стаж с:'} value={'Да'} />
      <InfoLIneRow title={'Класс водителя:'} value={'Да'} />
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        Данные об автомобиле
      </Typography.B18>
      <InfoLIneRow title={'Марка авто:'} value={'Да'} />
      <InfoLIneRow title={'Модель:'} value={'Да'} />
      <InfoLIneRow title={'Год выпуска:'} value={'Да'} />
      <InfoLIneRow title={'Тип авто:'} value={'Да'} />
      <InfoLIneRow title={'Объем двигателя:'} value={'Да'} />
      <InfoLIneRow title={'Мощность электродвигателя:'} value={'Да'} />
      <InfoLIneRow title={'Грузоподъемность:'} value={'Да'} />
      <InfoLIneRow title={'Номер двигателя:'} value={'Да'} />
      <InfoLIneRow title={'Страна регистрации:'} value={'Да'} />
      <InfoLIneRow title={'Техосмотр:'} value={'Да'} />
      <Typography.B18 marginBottom={8} color={'rgba(47, 128, 237, 1)'}>
        Информация о полисе
      </Typography.B18>
      <InfoLIneRow title={'Доставка:'} value={'Да'} />
      <InfoLIneRow title={'Адрес доставки:'} value={'Бишкек, 3мкрн 45/33'} />
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

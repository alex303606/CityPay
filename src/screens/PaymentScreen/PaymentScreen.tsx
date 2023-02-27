import React, {useCallback, useEffect, useState} from 'react';
import {
  Block,
  Colors,
  IconNames,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, PaymentsStackParamList} from '@navigators';
import {ActivityIndicator} from 'react-native';
import {useGetPaymentByPaymentNumber, useTheme} from '@hooks';
import {IPayment} from '@store';
import styled from 'styled-components';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENT_SCREEN
>;

type RowProps = {
  label: string;
  value: string | number | null | undefined;
};

const PaymentRow: React.FC<RowProps> = ({label, value}) => {
  const {theme} = useTheme();

  if (!value) {
    return null;
  }

  return (
    <Block marginBottom={16}>
      <Typography.B20 color={theme.textColor}>{label}</Typography.B20>
      <Typography.R16 color={theme.textColor}>{value}</Typography.R16>
    </Block>
  );
};

export const PaymentScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {
    params: {paymentNumber},
  } = route;

  const [payment, setPayment] = useState<IPayment | null>(null);

  const {getPaymentByPaymentNumber, loading} =
    useGetPaymentByPaymentNumber(paymentNumber);

  const getPayment = useCallback(async () => {
    const paymentRes = await getPaymentByPaymentNumber();
    if (paymentRes) {
      setPayment(paymentRes);
    }
  }, [getPaymentByPaymentNumber]);

  useEffect(() => {
    getPayment();
  }, [getPayment]);

  const onPressShare = useCallback(() => {
    return;
  }, []);

  if (loading) {
    return (
      <Block
        alignItems={'center'}
        justifyContent={'center'}
        flex={1}
        backgroundColor={theme.backgroundColor}>
        <ActivityIndicator size="large" color={theme.buttonColor} />
      </Block>
    );
  }

  if (!payment) {
    return null;
  }

  const dateCreate = payment.dateCreate
    ? new Date(payment.dateCreate).toLocaleString('ru', {
        minute: 'numeric',
        hour: 'numeric',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const datePayment = payment.datePayment
    ? new Date(payment.datePayment).toLocaleString('ru', {
        minute: 'numeric',
        hour: 'numeric',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <ScreenContainer
      onPressButton={onPressShare}
      showButton
      iconName={IconNames.share}
      title={t('payments.receipt')}>
      <PaymentRow label={'Тип операции'} value={payment.protocolNumber} />
      <PaymentRow label={'Статья'} value={payment.article} />
      <PaymentRow label={'Номер квитанции'} value={paymentNumber} />
      <PaymentRow label={'Поставщик услуг'} value={paymentNumber} />
      <PaymentRow label={'Дата создания'} value={dateCreate} />
      <PaymentRow label={'Дата оплаты'} value={datePayment} />
      <PaymentRow label={'ФИО/Наименование'} value={payment.username} />
      <PaymentRow label={'Номер протокола'} value={payment.protocolNumber} />
      <PaymentRow label={'Номер авто'} value={payment.number} />
      <PaymentRow label={'Сумма'} value={payment.amount} />
      <PaymentRow label={'Коммисия'} value={payment.paymentService} />
      <Row alignItems={'center'} justifyContent={'center'}>
        <StatusText color={Colors.red}>{payment.status_payment}</StatusText>
      </Row>
    </ScreenContainer>
  );
};

const StatusText = styled(Typography.B24)({
  textTransform: 'uppercase',
  borderWidth: 3,
  borderColor: Colors.red,
  paddingVertical: 4,
  paddingHorizontal: 16,
  height: 44,
  lineHeight: 36,
});

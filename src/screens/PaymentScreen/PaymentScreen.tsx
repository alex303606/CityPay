import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Block,
  IconNames,
  PaymentRow,
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
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENT_SCREEN
>;

const DPS = '8';

export const PaymentScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {
    params: {paymentNumber},
  } = route;
  const viewShotRef = useRef<any>(null);

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
    viewShotRef.current?.capture().then((uri: string) => {
      RNFS.readFile(uri, 'base64').then(res => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: '',
          message: '',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
    });
  }, []);

  const serviceProvider = useMemo(() => {
    return payment?.finesType === DPS
      ? {
          type: t('payments.serviceProviderDps.type'),
          provider: t('payments.serviceProviderDps.provider'),
        }
      : {
          type: t('payments.serviceProviderCity.type'),
          provider: t('payments.serviceProviderCity.provider'),
        };
  }, [payment?.finesType, t]);

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

  const style = {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  };

  return (
    <ViewShot
      style={style}
      ref={viewShotRef}
      options={{format: 'jpg', quality: 0.9}}>
      <ScreenContainer
        onPressButton={onPressShare}
        showButton={payment.status === '1'}
        iconName={IconNames.share}
        title={t('payments.receipt')}>
        <Block flex={1}>
          <PaymentRow
            label={t('payments.operationType')}
            value={serviceProvider.type}
          />
          <PaymentRow label={t('payments.article')} value={payment.article} />
          <PaymentRow
            label={t('payments.paymentNumber')}
            value={paymentNumber}
          />
          <PaymentRow
            label={t('payments.serviceProvider')}
            value={serviceProvider.provider}
          />
          <PaymentRow label={t('payments.dateCreate')} value={dateCreate} />
          <PaymentRow label={t('payments.datePayment')} value={datePayment} />
          <PaymentRow
            label={t('payments.protocolNumber')}
            value={payment.protocolNumber}
          />
          <PaymentRow label={t('payments.number')} value={payment.number} />
          <PaymentRow
            label={t('payments.paymentSum')}
            value={payment.paymentSum}
          />
          <StyledStatusRow
            color={
              payment.status_payment === 'Оплачен' ? theme.paidColor : '#FF0000'
            }>
            <StatusText
              color={
                payment.status_payment === 'Оплачен'
                  ? theme.paidColor
                  : '#FF0000'
              }>
              {payment.status_payment}
            </StatusText>
          </StyledStatusRow>
        </Block>
      </ScreenContainer>
    </ViewShot>
  );
};

const StyledStatusRow = styled(Row)<{color: string}>(({color}) => ({
  transform: 'rotate(-25deg)',
  borderWidth: 3,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderColor: color,
  bottom: 100,
  right: 0,
}));

const StatusText = styled(Typography.B24)({
  textTransform: 'uppercase',
});

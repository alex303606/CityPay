import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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

  const dateCreate = payment?.dateCreate
    ? new Date(payment.dateCreate).toLocaleString('ru', {
        minute: 'numeric',
        hour: 'numeric',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const datePayment = payment?.datePayment
    ? new Date(payment.datePayment).toLocaleString('ru', {
        minute: 'numeric',
        hour: 'numeric',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

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

  const onPressShare = useCallback(async () => {
    const html = `<html>
<head>
  <style type="text/css"> * {
      margin: 0;
      padding: 0;
      text-indent: 0;
  }

  p {
      color: black;
      font-family: "Times New Roman", serif;
      font-style: normal;
      font-weight: normal;
      text-decoration: none;
      font-size: 12.5pt;
      margin: 0pt;
  }

  .a, a {
      color: black;
      font-family: "Times New Roman", serif;
      font-style: normal;
      font-weight: normal;
      text-decoration: none;
      font-size: 12.5pt;
  }

  .s1 {
      color: black;
      font-family: "Times New Roman", serif;
      font-style: normal;
      font-weight: normal;
      text-decoration: none;
      font-size: 9.5pt;
  }
  </style>
</head>
<body><p style="text-indent: 0pt;text-align: left;" />
<p style="padding-top: 7pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${datePayment}</p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<p style="padding-top: 4pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">Электронная квитанция</p>
<p style="padding-top: 1pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">№ ${paymentNumber}</p>
<p style="padding-top: 1pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">ОсОО &quot;СитиСофт&quot;</p>
<p style="padding-top: 1pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">ИНН 00912202010247</p>
<p style="padding-top: 1pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">г.Бишкек, ул.Исанова 79 к.505</p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<p style="padding-left: 5pt;text-indent: 0pt;line-height: 111%;text-align: left;">Наименование услуги: ${serviceProvider.type} Статья нарушения: ${payment?.article}</p>
<p style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Номер протокола: ${payment?.protocolNumber}</p>
<p style="padding-top: 1pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Код оплаты: ${payment?.paymentNumber}</p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<!--<p style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Оплата произведена картой: 4215-89XX-XXXX-5314</p>-->
<p style="padding-top: 1pt;padding-left: 5pt;text-indent: 0pt;line-height: 111%;text-align: left;">Сумма штрафа: ${payment?.amount} сом Сумма комиссии: ${payment?.paymentService} сом Комиссия за эквайринг: ${payment?.paymentBank} сом Сумма платежа: ${payment?.paymentSum} сом</p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<p style="text-indent: 0pt;text-align: left;" />
<p style="padding-top: 4pt;padding-left: 21pt;text-indent: 0pt;text-align: left;">Служба поддержки: +996 553 01 03 28</p>
<p style="padding-top: 1pt;padding-left: 21pt;text-indent: 0pt;text-align: left;">
<a href="mailto:citypay@internet.ru" class="a" target="_blank">Электронный адрес: </a><a href="mailto:citypay@internet.ru" target="_blank">citypay@internet.ru</a></p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<p style="padding-left: 65pt;text-indent: 0pt;text-align: center;">СПАСИБО!</p>
<p style="padding-top: 1pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">Сохраняйте чек до зачисления денег за оплату штрафа. Желаем Вам удачи на дорогах</p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<p class="s1" style="padding-left: 65pt;text-indent: 0pt;text-align: center;">Оплата производится ОсОО «Кыргызмобайлкомпани»</p>
<p style="text-indent: 0pt;text-align: left;" />
<p class="s1" style="padding-top: 1pt;padding-left: 65pt;text-indent: 0pt;text-align: center;">Лицензия НБ КР 20270801120 и №3028080120 от 08 января 2020г.</p></body>
</html>
`;
    let options = {
      html,
      fileName: payment?.protocolNumber
        ? `Электронная квитанция №${payment?.protocolNumber}`
        : 'Электронная квитанция',
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);

    Share.open({
      title: '',
      filename: payment?.protocolNumber
        ? `Электронная квитанция №${payment?.protocolNumber}`
        : 'Электронная квитанция',
      url: `file://${file.filePath}`,
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        err && console.log(err);
      });
  }, [payment]);

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

  return (
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
        <PaymentRow label={t('payments.paymentNumber')} value={paymentNumber} />
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
              payment.status_payment === 'Оплачен' ? theme.paidColor : '#FF0000'
            }>
            {payment.status_payment === 'Оплачен'
              ? 'Оплачено'
              : payment.status_payment}
          </StatusText>
        </StyledStatusRow>
      </Block>
    </ScreenContainer>
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

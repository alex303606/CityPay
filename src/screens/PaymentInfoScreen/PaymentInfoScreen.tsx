import {PaymentRow, ScreenContainer} from '@UIKit';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PAYMENTS_INFO_SCREEN
>;

export const PaymentInfoScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const {
    params: {paymentNumber, amount},
  } = route;

  return (
    <ScreenContainer title={t('payments.paymentInfo')}>
      <PaymentRow label={t('payments.paymentNumber')} value={paymentNumber} />
      <PaymentRow label={t('payments.paymentSum')} value={amount} />
    </ScreenContainer>
  );
};

import {PaymentRow, ScreenContainer} from '@UIKit';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {addPayment, getUserState} from '@store';
import {useAppSelector, useSnackbarNotification} from '@hooks';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PAYMENTS_INFO_SCREEN
>;

export const PaymentInfoScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const [paymentSum, setPaymentSum] = useState('');

  const {
    params: {paymentNumber, amount},
  } = route;

  const {phone} = useAppSelector(getUserState);

  const addPaymentHandler = useCallback(async () => {
    const response = await addPayment({paymentNumber, amount, phone});
    if (!response?.result || !response?.data?.paymentSum) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    setPaymentSum(response.data.paymentSum);
  }, [amount, paymentNumber, phone, showNotification, t]);

  useEffect(() => {
    addPaymentHandler();
  }, [addPaymentHandler]);

  return (
    <ScreenContainer title={t('payments.paymentInfo')}>
      <PaymentRow label={t('payments.paymentNumber')} value={paymentNumber} />
      <PaymentRow label={t('payments.paymentSum')} value={paymentSum} />
    </ScreenContainer>
  );
};

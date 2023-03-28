import {Block, Button, Colors, PaymentRow, ScreenContainer} from '@UIKit';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {addPayment, getSettingsState, getUserState} from '@store';
import {
  useAppSelector,
  useLoading,
  useSnackbarNotification,
  useTheme,
} from '@hooks';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PAYMENTS_INFO_SCREEN
>;

export const PaymentInfoScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const [paymentSum, setPaymentSum] = useState('');
  const {loading, hideLoader, showLoader} = useLoading();
  const {theme} = useTheme();
  const {isPaymentActive} = useAppSelector(getSettingsState);
  const {
    params: {paymentNumber, amount, fine, finesType},
  } = route;

  const {phone} = useAppSelector(getUserState);

  const addPaymentHandler = useCallback(async () => {
    showLoader();
    const response = await addPayment({
      paymentNumber,
      amount,
      phone,
      number: fine?.plateNumber,
      article: fine?.violationArticle,
      protocolNumber: fine?.protocolNumber,
      finesType,
    });
    hideLoader();
    if (!response?.result || !response?.data?.paymentSum) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    setPaymentSum(response.data.paymentSum);
  }, [
    amount,
    fine?.plateNumber,
    fine?.protocolNumber,
    fine?.violationArticle,
    finesType,
    hideLoader,
    paymentNumber,
    phone,
    showLoader,
    showNotification,
    t,
  ]);

  useEffect(() => {
    addPaymentHandler();
  }, [addPaymentHandler]);

  const onHandlePressPay = useCallback(() => {
    return null;
  }, []);

  return (
    <ScreenContainer title={t('payments.paymentInfo')}>
      <Block flex={1}>
        <PaymentRow label={t('payments.paymentNumber')} value={paymentNumber} />
        <PaymentRow label={t('payments.paymentSum')} value={paymentSum} />
      </Block>
      <Button
        disabled={!paymentSum || isPaymentActive !== 1}
        loading={loading}
        color={theme.buttonColor}
        title={t('payments.payByCard')}
        onPress={onHandlePressPay}
      />
      {loading && (
        <StyledFloatingBlock>
          <ActivityIndicator size="large" color={Colors.blue} />
        </StyledFloatingBlock>
      )}
    </ScreenContainer>
  );
};

const StyledFloatingBlock = styled(Block)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255,255,255,0.3)',
  alignItems: 'center',
  justifyContent: 'center',
});

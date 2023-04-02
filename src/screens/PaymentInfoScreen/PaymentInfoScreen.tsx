import {Block, Button, Colors, PaymentRow, ScreenContainer} from '@UIKit';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {addPayment, getSettingsState, getUserState, IFinesType} from '@store';
import {
  useAppSelector,
  useLoading,
  useSnackbarNotification,
  useTheme,
} from '@hooks';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {NativeModules} from 'react-native';
const {PayBoxModule} = NativeModules;

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PAYMENTS_INFO_SCREEN
>;

const payBoxModuleInitPayment = ({
  payUserId,
  payAmount,
  payComment,
  orderId,
}: {
  payUserId: string | null;
  orderId: string | null;
  payAmount: number;
  payComment: string;
}) => PayBoxModule.initPayment(orderId, payUserId, payAmount, payComment);

export const PaymentInfoScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const [paymentSum, setPaymentSum] = useState(0);
  const {loading, hideLoader, showLoader} = useLoading();
  const {theme} = useTheme();
  const {isPaymentActive} = useAppSelector(getSettingsState);
  const {
    params: {paymentNumber, amount, fine, finesType},
  } = route;
  const {userId} = useAppSelector(getUserState);

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
    if (!response?.result || !response?.data?.paymentSum) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    setPaymentSum(response.data.paymentSum);
    hideLoader();
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
    payBoxModuleInitPayment({
      orderId: paymentNumber,
      payAmount: paymentSum,
      payComment: 'Тестовое сообщение',
      payUserId: userId,
    });
  }, [paymentSum, userId]);

  const serviceProvider = useMemo(() => {
    return finesType === IFinesType.DPS
      ? {
          type: t('payments.serviceProviderDps.type'),
          provider: t('payments.serviceProviderDps.provider'),
        }
      : {
          type: t('payments.serviceProviderCity.type'),
          provider: t('payments.serviceProviderCity.provider'),
        };
  }, [finesType, t]);

  return (
    <ScreenContainer title={t('payments.paymentInfo')}>
      <Block flex={1}>
        <PaymentRow
          label={t('payments.operationType')}
          value={serviceProvider.type}
        />
        <PaymentRow
          label={t('payments.serviceProvider')}
          value={serviceProvider.provider}
        />
        {!!fine?.violationArticle && (
          <PaymentRow
            label={t('payments.article')}
            value={fine?.violationArticle}
          />
        )}
        {!!fine?.plateNumber && (
          <PaymentRow
            label={t('payments.protocolNumber')}
            value={fine?.protocolNumber}
          />
        )}
        {!!fine?.plateNumber && (
          <PaymentRow label={t('payments.number')} value={fine?.plateNumber} />
        )}
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

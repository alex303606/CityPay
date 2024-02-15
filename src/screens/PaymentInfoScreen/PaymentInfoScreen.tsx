import {Block, Button, Loader, PaymentRow, ScreenContainer} from '@UIKit';
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
import {NativeModules, NativeEventEmitter} from 'react-native';

const {PayBoxModule, MBankModule} = NativeModules;

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PAYMENTS_INFO_SCREEN
>;

const payBoxModuleInitPayment = ({
  payUserId,
  payAmount,
  phone,
  orderId,
  resultUrl,
}: {
  payUserId: string | null;
  orderId: string | null;
  payAmount: number;
  phone: string;
  resultUrl: string;
}) => PayBoxModule.initPayment(orderId, payUserId, payAmount, phone, resultUrl);

const MBankModuleInitPayment = ({
  payUserId,
  payAmount,
  phone,
  orderId,
  resultUrl,
}: {
  payUserId: string | null;
  orderId: string | null;
  payAmount: number;
  phone: string;
  resultUrl: string;
}) => MBankModule.initPayment(orderId, payUserId, payAmount, phone, resultUrl);

export const PaymentInfoScreen: React.FC<Props> = ({route, navigation}) => {
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

  const orderId = useMemo(
    () => `${paymentNumber}-${Math.floor(1000 + Math.random() * 9000)}`,
    [paymentNumber],
  );

  const addPaymentHandler = useCallback(async () => {
    showLoader();
    const response = await addPayment({
      paymentNumber: orderId,
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

  useEffect(() => {
    PayBoxModule.registerPbListener();
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    const subscription = eventEmitter.addListener(
      'EventReminder',
      (event: Object) => {
        try {
          const eventName = Object.keys(event)[0];
          const message = Object.values(event)[0];
          switch (eventName) {
            case 'onPaymentPaid':
              showNotification(t('Операция прошла успешно'));
              return navigation.navigate(EScreens.FINES_SCREEN);
            case 'onError':
              showNotification(message);
              return navigation.navigate(EScreens.FINES_SCREEN);
            default:
              return;
          }
        } catch (e) {
          return showNotification(t('errors.somethingWentWrong'));
        }
      },
    );
    return () => {
      PayBoxModule.removePbListener();
      subscription.remove();
    };
  }, []);

  const onHandlePressPayByCard = useCallback(() => {
    const resultUrl = `https://citysoft.kido.kg/api/merchants_paybox.php?user_phone=${phone}&paymentCode=${orderId}&amount=${paymentSum}&device=android`;
    payBoxModuleInitPayment({
      orderId,
      payAmount: paymentSum,
      phone,
      payUserId: userId,
      resultUrl,
    });
  }, [paymentSum, userId]);

  const onHandlePressPayByMBank = useCallback(() => {
    const resultUrl = `https://citysoft.kido.kg/api/merchants_paybox.php?user_phone=${phone}&paymentCode=${orderId}&amount=${paymentSum}&isMbank=1&device=android`;

    MBankModuleInitPayment({
      orderId,
      payAmount: paymentSum,
      phone,
      payUserId: userId,
      resultUrl,
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
        onPress={onHandlePressPayByCard}
        marginBottom={16}
      />
      <Button
        disabled={!paymentSum || isPaymentActive !== 1}
        loading={loading}
        color={theme.buttonColor}
        title={t('payments.payByMBank')}
        onPress={onHandlePressPayByMBank}
      />
      {loading && <Loader />}
    </ScreenContainer>
  );
};

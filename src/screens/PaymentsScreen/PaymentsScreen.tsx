import React, {useCallback, useEffect, useMemo} from 'react';
import {ScreenContainer, Typography} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {useAppSelector, useGetPaymentsList, useTheme} from '@hooks';
import {getPayments, getUserState, IPayment} from '@store';
import {PaymentCard} from './components/PaymentCard';

const DAYS_LIMIT = 30;

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;
const keyExtractor = (item: IPayment) =>
  `${item.paymentNumber}-${item.protocolNumber}-${Math.random()}`;

export const PaymentsScreen: React.FC<Props> = ({navigation}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const payments = useAppSelector(getPayments).filter(p => p.status === '1');
  const {isPremiumAccess} = useAppSelector(getUserState);
  const handlePressPayment = useCallback(
    (paymentNumber: string) => {
      navigation.navigate(EScreens.PAYMENT_SCREEN, {paymentNumber});
    },
    [navigation],
  );

  const data = useMemo(() => {
    return payments.filter(p => {
      const currentDate = new Date().getTime();
      const fineDate = new Date(p.dateCreate).getTime();
      const diff = Math.ceil(
        Math.abs(currentDate - fineDate) / (1000 * 60 * 60 * 24),
      );

      return isPremiumAccess ? p : diff < DAYS_LIMIT;
    });
  }, [isPremiumAccess, payments]);

  const renderItem: ListRenderItem<IPayment> = useCallback(
    ({item}) => {
      return <PaymentCard payment={item} onPress={handlePressPayment} />;
    },
    [handlePressPayment],
  );

  const {getPaymentsListHandler, loading} = useGetPaymentsList();

  useEffect(() => {
    getPaymentsListHandler();
  }, [getPaymentsListHandler]);

  return (
    <ScreenContainer scroll={false} title={t('payments.title')}>
      {!isPremiumAccess && (
        <Typography.R16 marginBottom={16} color={theme.textColor}>
          {t('payments.subTitle', {number: payments.length})}
        </Typography.R16>
      )}
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={Separator}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getPaymentsListHandler}
          />
        }
      />
    </ScreenContainer>
  );
};

const List: FlatListType = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))({});

const Separator = styled(View)({height: 16});

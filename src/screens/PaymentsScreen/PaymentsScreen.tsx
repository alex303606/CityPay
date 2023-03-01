import React, {useCallback, useEffect} from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {useAppSelector, useGetPaymentsList} from '@hooks';
import {getPayments, getUserState, IPayment} from '@store';
import {PaymentCard} from './components/PaymentCard';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;
const keyExtractor = (item: IPayment) =>
  `${item.paymentNumber}-${item.protocolNumber}-${Math.random()}`;

export const PaymentsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const payments = useAppSelector(getPayments); //.filter(p => p.status === '1');
  const {isPremiumAccess} = useAppSelector(getUserState);
  const handlePressPayment = useCallback(
    (paymentNumber: string) => {
      navigation.navigate(EScreens.PAYMENT_SCREEN, {paymentNumber});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<IPayment> = useCallback(
    ({item}) => {
      return <PaymentCard payment={item} onPress={handlePressPayment} />;
    },
    [handlePressPayment],
  );

  const {getPaymentsListHandler, loading} = useGetPaymentsList();

  useEffect(() => {
    getPaymentsListHandler();
  }, []);

  return (
    <ScreenContainer scroll={false} title={t('payments.title')}>
      {!isPremiumAccess && (
        <Typography.R16 marginBottom={16} color={Colors.grey}>
          {t('payments.subTitle', {number: payments.length})}
        </Typography.R16>
      )}
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={payments}
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

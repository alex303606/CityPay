import React, {useCallback, useEffect} from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {useAppSelector, useGetPaymentsList} from '@hooks';
import {getPayments, IPayment} from '@store';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;
const keyExtractor = (item: IPayment) =>
  `${item.paymentNumber}-${item.protocolNumber}-${Math.random()}`;

export const PaymentsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const payments = useAppSelector(getPayments);

  const renderItem: ListRenderItem<IPayment> = useCallback(
    ({item}) => (
      <Typography.R20 marginVertical={32} color={Colors.black}>
        {item.paymentNumber}
      </Typography.R20>
    ),
    [],
  );

  const {getPaymentsListHandler, loading} = useGetPaymentsList();

  useEffect(() => {
    getPaymentsListHandler();
  }, [getPaymentsListHandler]);

  return (
    <ScreenContainer scroll={false} title={t('payments.title')}>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={payments}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
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

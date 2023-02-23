import React, {useCallback, useEffect} from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {useGetPaymentsList, useLoading} from '@hooks';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;
const keyExtractor = (item: IPayment) => item.number;

type IPayment = {
  number: string;
};

const payments: IPayment[] = [
  {number: '1'},
  {number: '2'},
  {number: '3'},
  {number: '4'},
  {number: '5'},
  {number: '6'},
  {number: '7'},
  {number: '8'},
  {number: '9'},
  {number: '10'},
];

export const PaymentsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();

  const reload = useCallback(() => {
    showLoader();
    hideLoader();
  }, [hideLoader, showLoader]);

  const renderItem: ListRenderItem<IPayment> = useCallback(
    ({item}) => (
      <Typography.R20 marginVertical={32} color={Colors.black}>
        {item.number}
      </Typography.R20>
    ),
    [],
  );

  const {getPaymentsListHandler} = useGetPaymentsList();

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
          <RefreshControl refreshing={loading} onRefresh={reload} />
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

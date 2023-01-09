import React, {useCallback} from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {useLoading} from '@hooks';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

type IFine = {
  number: string;
};

const keyExtractor = (item: IFine) => item.number;

const fines: IFine[] = [
  // {number: '1'},
  // {number: '2'},
  // {number: '3'},
  // {number: '4'},
  // {number: '5'},
  // {number: '6'},
  // {number: '7'},
  // {number: '8'},
  // {number: '9'},
  // {number: '10'},
];

export const FinesScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();

  const renderItem: ListRenderItem<IFine> = useCallback(
    ({item}) => (
      <Typography.R20 marginVertical={32} color={Colors.black}>
        {item.number}
      </Typography.R20>
    ),
    [],
  );

  const reload = useCallback(() => {
    showLoader();
    hideLoader();
  }, [hideLoader, showLoader]);

  return (
    <ScreenContainer scroll={false} title={t('fines.title')}>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={fines}
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

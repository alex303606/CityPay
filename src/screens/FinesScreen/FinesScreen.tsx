import React, {useCallback, useEffect} from 'react';
import {FineComponent, ScreenContainer} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {useAppSelector, useGetFinesByAllCarsNumberAndPin} from '@hooks';
import {getCars, getFines, IFine} from '@store';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

const keyExtractor = (item: IFine) => item.protocolNumber;

export const FinesScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const cars = useAppSelector(getCars);

  const {getFinesByAllCarsNumberAndPin, loading} =
    useGetFinesByAllCarsNumberAndPin(cars);

  const fines = useAppSelector(getFines);

  const handlePressFine = useCallback(
    (fine: IFine) => {
      navigation.navigate(EScreens.SINGLE_FINE_SCREEN, {fine});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<IFine> = useCallback(
    ({item}) => <FineComponent fine={item} onPress={handlePressFine} />,
    [handlePressFine],
  );

  useEffect(() => {
    getFinesByAllCarsNumberAndPin();
  }, [getFinesByAllCarsNumberAndPin]);

  return (
    <ScreenContainer scroll={false} title={t('fines.title')}>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={fines}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={Separator}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getFinesByAllCarsNumberAndPin}
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
}))({
  marginTop: 16,
});

const Separator = styled(View)({height: 16});

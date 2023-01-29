import React, {FC, useCallback, useEffect} from 'react';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {
  Block,
  CarComponent,
  Colors,
  EShadow,
  RoundButton,
  ScreenContainer,
  ShadowsSizes,
  Typography,
} from '@UIKit';
import {EmptyList} from './components/EmptyList';
import styled from 'styled-components';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import {useAppSelector, useReloadCarList} from '@hooks';
import {FlatListType} from '../types';
import {getCars, ICar} from '@store';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

const keyExtractor = (item: ICar) => item.number;

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const cars = useAppSelector(getCars);

  const {reloadCarList, loading} = useReloadCarList();

  useEffect(() => {
    reloadCarList();
  }, [reloadCarList]);

  const addCarHandler = useCallback(() => {
    navigation.navigate(EScreens.MODAL_ADD_CAR);
  }, [navigation]);

  const handlePressNumber = useCallback(
    ({car, isNewNumber}: {car: ICar; isNewNumber: boolean}) => {
      navigation.navigate(EScreens.SINGLE_CAR_SCREEN, {car, isNewNumber});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<ICar> = useCallback(
    ({item}) => {
      const isNewNumber = !!parseInt(item.number.substring(0, 2), 10);
      return (
        <CarComponent
          onPress={handlePressNumber}
          isNewNumber={isNewNumber}
          car={item}
        />
      );
    },
    [handlePressNumber],
  );

  return (
    <ScreenContainer scroll={false} title={t('cars.title')}>
      <Typography.R14 marginBottom={4} color={Colors.grey}>
        Списов автомобилей для проверки штрафов с системы "Безопасный город"
      </Typography.R14>
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={cars}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={Separator}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reloadCarList} />
        }
      />
      <FloatingButton>
        <RoundButton
          elevation={ShadowsSizes[EShadow.S]}
          onPress={addCarHandler}
        />
      </FloatingButton>
    </ScreenContainer>
  );
};

const FloatingButton = styled(Block)({
  position: 'absolute',
  bottom: 16,
  right: 16,
});

const Separator = styled(View)({height: 16});

const List: FlatListType = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))({
  marginTop: 16,
});

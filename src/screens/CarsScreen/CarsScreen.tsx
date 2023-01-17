import React, {FC, useCallback} from 'react';
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
import {useLoading} from '@hooks';
import {FlatListType} from '../types';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

type ICar = {
  number: string;
};

const keyExtractor = (item: ICar) => item.number;

const cars: ICar[] = [
  {number: 'E 0209 E'},
  {number: 'E 9209 E'},
  {number: 'E 8209 E'},
  {number: 'E 7209 E'},
  {number: 'E 6209 E'},
  {number: 'E 5209 E'},
  {number: 'E 4209 E'},
  {number: 'E 3209 E'},
  {number: 'E 2209 E'},
  {number: 'E 1209 E'},
];

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();

  const addCarHandler = useCallback(() => {
    navigation.navigate(EScreens.MODAL_ADD_CAR);
  }, [navigation]);

  const handlePressNumber = useCallback(
    (number: string) => {
      navigation.navigate(EScreens.SINGLE_CAR_SCREEN, {number});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<ICar> = useCallback(
    ({item}) => {
      return <CarComponent onPress={handlePressNumber} number={item.number} />;
    },
    [handlePressNumber],
  );

  const reload = useCallback(() => {
    showLoader();
    hideLoader();
  }, [hideLoader, showLoader]);

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
          <RefreshControl refreshing={loading} onRefresh={reload} />
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

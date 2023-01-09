import React, {FC, useCallback} from 'react';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {
  Block,
  Colors,
  EShadow,
  RoundButton,
  ScreenContainer,
  ShadowsSizes,
  Typography,
} from '@UIKit';
import {EmptyList} from './components/EmptyList';
import styled from 'styled-components';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import {useLoading} from '@hooks';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

const keyExtractor = (item: any) => item;
type ICar = {
  number: string;
};
const cars: ICar[] = [
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

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();

  const addCarHandler = useCallback(() => {
    navigation.navigate(EScreens.MODAL_ADD_CAR);
  }, [navigation]);

  const renderItem: ListRenderItem<ICar> = useCallback(
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

type FlatListType = <T>(
  props: FlatListProps<T>,
) => ReturnType<FC<FlatListProps<T>>>;

const List: FlatListType = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))({});

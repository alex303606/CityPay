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
import {useAppDispatch, useAppSelector, useSnackbarNotification} from '@hooks';
import {FlatListType} from '../types';
import {getCarList, getCars, getCarsSuccess, getUserState, ICar} from '@store';
import {useFocusEffect} from '@react-navigation/native';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

const keyExtractor = (item: ICar) => item.number;

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {phone} = useAppSelector(getUserState);
  const cars = useAppSelector(getCars);
  const dispatch = useAppDispatch();

  const reloadCarList = useCallback(async () => {
    const response = await getCarList(phone);
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response.result) {
      if (response.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    dispatch(
      getCarsSuccess({
        cars: response.cars,
      }),
    );
  }, [dispatch, phone, showNotification, t]);

  useFocusEffect(() => {
    reloadCarList();
  });

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
      const isNewNumber = false;
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
          <RefreshControl refreshing={false} onRefresh={reloadCarList} />
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

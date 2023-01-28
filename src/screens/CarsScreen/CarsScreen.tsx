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
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useSnackbarNotification,
} from '@hooks';
import {FlatListType} from '../types';
import {getCarList, getCarsSuccess, getUserState, ICar} from '@store';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

const keyExtractor = (item: ICar) => item.number;

const cars: ICar[] = [
  {number: 'E 0209 E', inn: '64762378y0§640728'},
  {number: 'E 9209 E', inn: '64762378y0§640728'},
  {number: 'E 8209 E', inn: '64762378y0§640728'},
  {number: 'E 7209 E', inn: '64762378y0§640728'},
  {number: 'E 6209 E', inn: '64762378y0§640728'},
  {number: 'E 5209 E', inn: '64762378y0§640728'},
  {number: 'E 4209 E', inn: '64762378y0§640728'},
  {number: 'E 3209 E', inn: '64762378y0§640728'},
  {number: 'E 2209 E', inn: '64762378y0§640728'},
  {number: 'E 1209 E', inn: '64762378y0§640728'},
];

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();
  const {showNotification} = useSnackbarNotification();
  const {phone} = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  const reloadCarList = useCallback(async () => {
    showLoader();
    const response = await getCarList(phone);
    hideLoader();
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
        ...response.data,
      }),
    );
  }, [dispatch, hideLoader, phone, showLoader, showNotification, t]);

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

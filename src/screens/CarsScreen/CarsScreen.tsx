import React, {FC, useCallback, useEffect} from 'react';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {
  Block,
  CarComponent,
  EShadow,
  RoundButton,
  ScreenContainer,
  ShadowsSizes,
  Typography,
} from '@UIKit';
import {EmptyList} from './components/EmptyList';
import styled from 'styled-components';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import {useAppSelector, useReloadCarList, useTheme} from '@hooks';
import {FlatListType} from '../types';
import {
  getCars,
  getSettingsState,
  getUserLastTimeDeletionCar,
  getUserState,
  ICar,
} from '@store';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

const MINUTES_LIMIT = 5;

const keyExtractor = (item: ICar) => item.number;

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {standardCarsLimit, premiumCarsLimit} =
    useAppSelector(getSettingsState);
  const cars = useAppSelector(getCars).slice(0, premiumCarsLimit);
  const {isPremiumAccess, phone} = useAppSelector(getUserState);
  const {reloadCarList, loading} = useReloadCarList();

  useEffect(() => {
    reloadCarList();
  }, []);

  const addCarHandler = useCallback(async () => {
    const response = await getUserLastTimeDeletionCar({
      phone,
    });

    const currentDateToSeconds = new Date().getTime() / 1000;

    const lastCarDeletionTime =
      typeof response?.data?.lastCarDeletionTime === 'number' &&
      response?.data.lastCarDeletionTime >= 0
        ? response?.data.lastCarDeletionTime
        : currentDateToSeconds;

    const diffMinutes = Math.floor(
      (currentDateToSeconds - lastCarDeletionTime) / 60,
    );

    if (!isPremiumAccess) {
      if (cars.length >= standardCarsLimit) {
        return navigation.navigate(EScreens.MODAL_BUY_PREMIUM_SCREEN, {
          title: t('premium.title.carsLimit'),
        });
      }

      if (
        diffMinutes < MINUTES_LIMIT &&
        cars.length === standardCarsLimit - 1
      ) {
        return navigation.navigate(EScreens.MODAL_BUY_PREMIUM_SCREEN, {
          title: t('premium.title.timeLimit', {
            count: MINUTES_LIMIT - diffMinutes,
          }),
        });
      }
    }

    navigation.navigate(EScreens.MODAL_ADD_CAR);
  }, [cars.length, isPremiumAccess, navigation, phone, t, standardCarsLimit]);

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
      <Typography.R16 marginBottom={4} color={theme.textColor}>
        {t('cars.subTitle')}
      </Typography.R16>
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
          iconSize={40}
          diameter={60}
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

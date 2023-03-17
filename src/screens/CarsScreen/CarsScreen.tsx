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
  useAppSelector,
  useGetFinesByAllCarsNumberAndPin,
  useReloadCarList,
} from '@hooks';
import {FlatListType} from '../types';
import {getCars, getUserLastTimeDeletionCar, getUserState, ICar} from '@store';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

const CARS_LIMIT = 2;
const MINUTES_LIMIT = 5;

const keyExtractor = (item: ICar) => item.number;

export const CarsScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const cars = useAppSelector(getCars);
  const {isPremiumAccess, phone} = useAppSelector(getUserState);
  const {getFinesByAllCarsNumberAndPin} =
    useGetFinesByAllCarsNumberAndPin(cars);
  const {reloadCarList, loading} = useReloadCarList();

  useEffect(() => {
    reloadCarList();
  }, []);

  useEffect(() => {
    getFinesByAllCarsNumberAndPin();
  }, [cars.length]);

  const addCarHandler = useCallback(async () => {
    const response = await getUserLastTimeDeletionCar({
      phone,
    });
    const currentDateToSeconds = new Date().getTime() / 1000;

    const lastCarDeletionTime =
      response?.data.lastCarDeletionTime || currentDateToSeconds;

    const diffMinutes = Math.floor(
      (currentDateToSeconds - lastCarDeletionTime) / 60,
    );

    if (!isPremiumAccess) {
      if (cars.length >= CARS_LIMIT) {
        return navigation.navigate(EScreens.MODAL_BUY_PREMIUM_SCREEN, {
          title: t('premium.title.carsLimit'),
        });
      }

      if (diffMinutes < MINUTES_LIMIT && cars.length === CARS_LIMIT - 1) {
        return navigation.navigate(EScreens.MODAL_BUY_PREMIUM_SCREEN, {
          title: t('premium.title.timeLimit', {
            count: MINUTES_LIMIT - diffMinutes,
          }),
        });
      }
    }

    navigation.navigate(EScreens.MODAL_ADD_CAR);
  }, [cars.length, isPremiumAccess, navigation, phone, t]);

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
      <Typography.R16 marginBottom={4} color={Colors.grey}>
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

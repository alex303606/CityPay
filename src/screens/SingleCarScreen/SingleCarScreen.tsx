import React, {useCallback, useEffect, useState} from 'react';
import {
  Block,
  CarComponent,
  FineComponent,
  IconNames,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {useGetFinesByCarNumber, useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {IFine} from '@store';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.SINGLE_CAR_SCREEN
>;

const keyExtractor = (item: IFine) => item.protocolNumber;

export const SingleCarScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {car, isNewNumber} = route.params;
  const {theme} = useTheme();
  const [fines, setFines] = useState<IFine[]>([]);

  const {getFinesByCarNumberAndPin, loading} = useGetFinesByCarNumber(car);

  const getFinesByCarNumber = useCallback(async () => {
    const finesArr = await getFinesByCarNumberAndPin();
    if (finesArr?.length) {
      setFines(finesArr[0]);
    }
  }, [getFinesByCarNumberAndPin]);

  useEffect(() => {
    getFinesByCarNumber();
  }, [getFinesByCarNumber]);

  const handlePressHeaderButton = useCallback(() => {
    navigation.navigate(EScreens.MODAL_DELETE_CAR, {car});
  }, [navigation, car]);

  const handlePressFine = useCallback(
    (fine: IFine) => {
      navigation.navigate(EScreens.SINGLE_FINE_SCREEN, {fine});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<IFine> = useCallback(
    ({item}) => {
      return <FineComponent onPress={handlePressFine} fine={item} />;
    },
    [handlePressFine],
  );

  return (
    <ScreenContainer
      color={theme.QRColor}
      title={t('cars.car', {number: car.number})}
      showButton
      scroll={false}
      iconName={IconNames.trash}
      onPressButton={handlePressHeaderButton}>
      <Block flex={1}>
        <CarComponent isNewNumber={isNewNumber} car={car} />
        <Row justifyContent={'flex-end'} marginTop={8}>
          <Typography.B16 textAlign={'center'} color={theme.textColor}>
            {t('cars.inn', {inn: car.inn})}
          </Typography.B16>
        </Row>
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
              onRefresh={getFinesByCarNumber}
            />
          }
        />
      </Block>
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

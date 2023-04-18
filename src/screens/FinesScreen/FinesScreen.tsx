import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Colors,
  FineComponent,
  IconNames,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {EmptyList} from './components/EmptyList';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {
  useAppSelector,
  useGetFinesByAllCarsNumberAndPin,
  useTheme,
} from '@hooks';
import {getCars, getFines, IFine} from '@store';

const UNPAID_STATUS = '0';
const PAID_STATUS = '1';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

const keyExtractor = (item: IFine) => item.protocolNumber;

export const FinesScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const cars = useAppSelector(getCars);
  const {theme} = useTheme();

  const {getFinesByAllCarsNumberAndPin, loading} =
    useGetFinesByAllCarsNumberAndPin(cars);

  const fines = useAppSelector(getFines);
  const [paymentStatus, setPaymentStatus] = useState<string>(UNPAID_STATUS);

  const handleChangePaymentStatus = useCallback((status: string) => {
    setPaymentStatus(status);
  }, []);

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

  const handlePressQR = useCallback(() => {
    navigation.navigate(EScreens.SELECT_FINE_TYPE_SCREEN);
  }, [navigation]);

  useEffect(() => {
    getFinesByAllCarsNumberAndPin();
  }, [cars]);

  const dataPaid = useMemo(
    () =>
      fines.filter(fine => {
        return (
          fine.paymentStatusName === 'Оплачено' ||
          fine.offlinePaymentStatus === '1'
        );
      }),
    [fines],
  );

  const dataUnPaid = useMemo(
    () =>
      fines.filter(fine => {
        return (
          fine.paymentStatusName !== 'Оплачено' &&
          fine.offlinePaymentStatus === ''
        );
      }),
    [fines],
  );

  return (
    <ScreenContainer
      color={theme.QRColor}
      onPressButton={handlePressQR}
      showButton
      iconName={IconNames.qrCode}
      scroll={false}
      title={t('fines.title')}>
      {!!fines.length && (
        <Row marginBottom={16}>
          <StyledRow marginRight={8}>
            <StyledPressable
              onPress={() => handleChangePaymentStatus(PAID_STATUS)}
              color={paymentStatus === PAID_STATUS ? '#258E00' : '#EAEAEA'}>
              <Typography.S16
                color={
                  paymentStatus === PAID_STATUS ? Colors.white : Colors.black
                }>
                {t('fines.paid')}
              </Typography.S16>
            </StyledPressable>
          </StyledRow>
          <StyledRow marginLeft={8}>
            <StyledPressable
              onPress={() => handleChangePaymentStatus(UNPAID_STATUS)}
              color={paymentStatus === UNPAID_STATUS ? '#FE0002' : '#EAEAEA'}>
              <Typography.S16
                color={
                  paymentStatus === PAID_STATUS ? Colors.black : Colors.white
                }>
                {t('fines.unpaid')}
              </Typography.S16>
            </StyledPressable>
          </StyledRow>
        </Row>
      )}
      <List
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={paymentStatus === PAID_STATUS ? dataPaid : dataUnPaid}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyList showHappy={!fines.length} />}
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
}))({});

const Separator = styled(View)({height: 16});

const StyledRow = styled(Row)({
  height: 56,
  flex: 1,
  borderRadius: 10,
  overflow: 'hidden',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{color: string}>(({color}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: 56,
  backgroundColor: color,
}));

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Block,
  Colors,
  Loader,
  PickerComponent,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useAppSelector, useGetLocationsList, useTheme} from '@hooks';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {getLocationsListList, getPartnersList, IPartner} from '@store';
const map = require('@assets/images/map.webp');

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.SELECT_CITY_SCREEN
>;

export const SelectCityScreen: React.FC<Props> = ({navigation}) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const {t} = useTranslation();
  const {theme} = useTheme();

  const {getLocationsListHandler, loading} = useGetLocationsList();

  useEffect(() => {
    getLocationsListHandler();
  }, [getLocationsListHandler]);

  const locationsList = useAppSelector(getLocationsListList);
  const partnersList = useAppSelector(getPartnersList);

  const onValueChangeHandler = useCallback(
    (city: string) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );

  const insurancePressHandler = useCallback((partner: IPartner) => {
    return navigation.navigate(EScreens.NEW_STATEMENT_SCREEN, {partner});
  }, []);

  const renderInsurance = useCallback((item: IPartner) => {
    return (
      <StyledRow
        marginVertical={10}
        backgroundColor={Colors.white}
        key={item.id}>
        <StyledPressable onPress={() => insurancePressHandler(item)}>
          <ImageWrapper>
            <StyledInsuranceImage
              source={{uri: item.logoUrl}}
              resizeMode={'contain'}
            />
          </ImageWrapper>
        </StyledPressable>
      </StyledRow>
    );
  }, []);

  const cities = useMemo(() => {
    return [
      {
        label: '-',
        value: null,
      },
      ...locationsList.map(city => ({
        label: city.title,
        value: city.id,
      })),
    ];
  }, [locationsList]);

  const partnersAvailableInRegion = useMemo(() => {
    const selectedLoc = locationsList.find(loc => loc.id === selectedCity);
    if (selectedLoc) {
      return partnersList.filter(p => selectedLoc.partnersId.includes(p.id));
    }
    return [];
  }, [partnersList, selectedCity]);

  const partnersNotAvailableInRegion = useMemo(() => {
    const selectedLoc = locationsList.find(loc => loc.id === selectedCity);
    if (selectedLoc) {
      return partnersList.filter(p => !selectedLoc.partnersId.includes(p.id));
    }
    return [];
  }, [partnersList, selectedCity]);

  return (
    <ScreenContainer title={t('osago.title')}>
      <Block flex={1}>
        <Typography.R16 marginBottom={4} color={theme.textColor}>
          {t('osago.subTitle')}
        </Typography.R16>
        <PickerComponent
          items={cities}
          onValueChange={onValueChangeHandler}
          selectedValue={selectedCity}
          title={t('osago.selectCity')}
        />
        {selectedCity === null ? (
          <Block flex={1} alignItems={'center'} justifyContent={'center'}>
            <StyledImage source={map} resizeMode={'contain'} />
          </Block>
        ) : null}
        {selectedCity !== null && !!partnersAvailableInRegion.length ? (
          <Typography.B16 marginTop={16} color={theme.textColor}>
            {t('osago.hasBranches')}
          </Typography.B16>
        ) : null}
        {selectedCity !== null && !!partnersAvailableInRegion.length
          ? partnersAvailableInRegion.map(renderInsurance)
          : null}
        {selectedCity !== null && !!partnersNotAvailableInRegion.length ? (
          <Typography.B16 marginTop={16} color={theme.textColor}>
            {t('osago.hasNotBranches')}
          </Typography.B16>
        ) : null}
        {selectedCity !== null && !!partnersNotAvailableInRegion.length
          ? partnersNotAvailableInRegion.map(renderInsurance)
          : null}
        {loading && <Loader />}
      </Block>
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 334,
  height: 165,
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  flex: 1,
  padding: 8,
});

const StyledInsuranceImage = styled(Image)({
  width: 180,
  height: 60,
});

const StyledRow = styled(Row)({
  borderRadius: 10,
  overflow: 'hidden',
  elevation: 5,
});

const ImageWrapper = styled(Row)({
  borderRadius: 10,
  overflow: 'hidden',
});

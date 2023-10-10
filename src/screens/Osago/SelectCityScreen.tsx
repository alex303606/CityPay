import React, {useCallback, useState} from 'react';
import {
  Block,
  Colors,
  PickerComponent,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {FlatList, Image, ListRenderItem, Pressable} from 'react-native';
import {FlatListType} from '../types';
const map = require('@assets/images/map.webp');
const insuranceCompany = require('@assets/images/Insurance_company.png');

const CITES = [
  {
    label: '-',
    value: null,
  },
  {
    label: 'Бишкек',
    value: 'Бишкек',
  },
  {
    label: 'Ош',
    value: 'Ош',
  },
  {
    label: 'Баткен',
    value: 'Баткен',
  },
  {
    label: 'Кант',
    value: 'Кант',
  },
];

export const SelectCityScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const {t} = useTranslation();
  const {theme} = useTheme();

  const onValueChangeHandler = useCallback(
    (city: string) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );

  const renderInsurance: ListRenderItem<number> = useCallback(() => {
    return (
      <Row marginVertical={10}>
        <StyledPressable>
          <Image source={insuranceCompany} />
        </StyledPressable>
      </Row>
    );
  }, []);

  return (
    <ScreenContainer scroll={false} title={t('osago.title')}>
      <Block flex={1}>
        <Typography.R16 marginBottom={4} color={theme.textColor}>
          {t('osago.subTitle')}
        </Typography.R16>
        <PickerComponent
          items={CITES}
          onValueChange={onValueChangeHandler}
          selectedValue={selectedCity}
          title={t('osago.selectCity')}
        />
        {selectedCity !== null ? (
          <Typography.B16 marginVertical={16} color={theme.textColor}>
            Только курьерская доставка (+500 сом)
          </Typography.B16>
        ) : null}
        {selectedCity === null ? (
          <Block flex={1} alignItems={'center'} justifyContent={'center'}>
            <StyledImage source={map} resizeMode={'contain'} />
          </Block>
        ) : null}
        {selectedCity !== null ? (
          <List
            data={Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9])}
            renderItem={renderInsurance}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </Block>
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 334,
  height: 165,
});

const List: FlatListType = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))({});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  flex: 1,
});

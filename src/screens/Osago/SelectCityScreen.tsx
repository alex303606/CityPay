import React, {useCallback, useState} from 'react';
import {Block, PickerComponent, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {Image} from 'react-native';
const map = require('@assets/images/map.webp');

const CITES = [
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
  const [selectedCity, setSelectedCity] = useState<string>('');
  const {t} = useTranslation();
  const {theme} = useTheme();

  const onValueChangeHandler = useCallback(
    (city: string) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );

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
        <Block flex={1} alignItems={'center'} justifyContent={'center'}>
          <StyledImage source={map} resizeMode={'contain'} />
        </Block>
      </Block>
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 334,
  height: 165,
});

import React from 'react';
import {Block, ScreenContainer, Typography} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.SINGLE_CAR_SCREEN
>;

export const SingleCarScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {number} = route.params;
  const {theme} = useTheme();

  return (
    <ScreenContainer title={t('cars.car', {number})}>
      <Block flex={1}>
        <Typography.B56 textAlign={'center'} color={theme.textColor}>
          HELLO
        </Typography.B56>
      </Block>
    </ScreenContainer>
  );
};

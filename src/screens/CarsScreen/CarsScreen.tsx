import React from 'react';
import {Block, Button} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useAppDispatch, useTheme} from '@hooks';
import {signOut} from '@store';
import {useTranslation} from 'react-i18next';
import {ScreenContainer} from '@UIKit';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

export const CarsScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <ScreenContainer title={t('cars.title')}>
      <Block justifyContent={'center'} flex={1}>
        <Button
          color={theme.buttonColor}
          title={'LOG_OUT'}
          onPress={() => dispatch(signOut())}
        />
      </Block>
    </ScreenContainer>
  );
};

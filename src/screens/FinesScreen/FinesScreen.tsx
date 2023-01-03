import React from 'react';
import {Block, Button, ScreenContainer} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

export const FinesScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <ScreenContainer title={t('fines.title')}>
      <Block justifyContent={'center'} flex={1}>
        <Button color={theme.buttonColor} title={'NEXT'} onPress={() => null} />
      </Block>
    </ScreenContainer>
  );
};

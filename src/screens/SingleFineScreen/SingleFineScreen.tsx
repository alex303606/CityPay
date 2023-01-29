import React from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.SINGLE_FINE_SCREEN
>;

export const SingleFineScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('payments.title')}>
      <Typography.R20 marginVertical={32} color={Colors.black}>
        hello
      </Typography.R20>
    </ScreenContainer>
  );
};

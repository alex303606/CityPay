import React from 'react';
import {Button, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarCheckStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<
  CarCheckStackParamList,
  EScreens.CAR_CHECK_SCREEN
>;

export const CarCheckScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('tabs.carCheck')}>
      <Button title={t('profile.addCard')} onPress={() => null} />
    </ScreenContainer>
  );
};

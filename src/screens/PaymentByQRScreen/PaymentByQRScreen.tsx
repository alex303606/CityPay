import {Colors, Icon, ScreenContainer} from '@UIKit';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.PAYMENTS_BY_QR_SCREEN
>;

export const PaymentByQRScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const {
    params: {icon},
  } = route;
  return (
    <ScreenContainer title={t('fines.title')}>
      <Icon name={icon} size={32} color={Colors.blue} />
    </ScreenContainer>
  );
};

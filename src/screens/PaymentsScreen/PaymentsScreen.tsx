import React from 'react';
import {Block, Button, ScreenContainer} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;

export const PaymentsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <ScreenContainer title={t('payments.title')}>
      <Block justifyContent={'center'} flex={1}>
        <Button
          color={theme.buttonColor}
          title={'PaymentsScreen'}
          onPress={() => null}
        />
      </Block>
    </ScreenContainer>
  );
};

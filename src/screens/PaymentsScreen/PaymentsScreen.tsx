import React from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {EScreens, PaymentsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<
  PaymentsStackParamList,
  EScreens.PAYMENTS_SCREEN
>;

export const PaymentsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('payments.title')}
      </Typography.B28>
      <Button title={'PaymentsScreen'} onPress={() => null} />
    </Block>
  );
};

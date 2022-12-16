import React from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<FinesStackParamList, EScreens.FINES_SCREEN>;

export const FinesScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('fines.title')}
      </Typography.B28>
      <Button title={'NEXT'} onPress={() => null} />
    </Block>
  );
};

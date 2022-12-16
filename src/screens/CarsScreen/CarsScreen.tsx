import React from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList} from '@navigators';
import {useAppDispatch} from '@hooks';
import {signOut} from '@store';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.CARS_SCREEN>;

export const CarsScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('cars.title')}
      </Typography.B28>
      <Button title={'LOG_OUT'} onPress={() => dispatch(signOut())} />
    </Block>
  );
};

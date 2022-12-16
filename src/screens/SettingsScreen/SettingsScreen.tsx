import React from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<
  SettingsStackParamList,
  EScreens.SETTINGS_SCREEN
>;

export const SettingsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('settings.title')}
      </Typography.B28>
      <Button title={'SettingsScreen'} onPress={() => null} />
    </Block>
  );
};

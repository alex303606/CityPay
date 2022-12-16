import React from 'react';
import {Block, Button, Colors} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  SettingsStackParamList,
  EScreens.SETTINGS_SCREEN
>;

export const SettingsScreen: React.FC<Props> = () => {
  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'SettingsScreen'} onPress={() => null} />
    </Block>
  );
};

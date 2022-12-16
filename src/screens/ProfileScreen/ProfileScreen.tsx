import React from 'react';
import {Block, Button, Colors} from '@UIKit';
import {EScreens, ProfileStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.PROFILE_SCREEN
>;

export const ProfileScreen: React.FC<Props> = () => {
  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      justifyContent={'center'}
      padding={32}>
      <Button title={'ProfileScreen'} onPress={() => null} />
    </Block>
  );
};

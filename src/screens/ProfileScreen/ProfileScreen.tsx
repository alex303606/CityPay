import React from 'react';
import {Block, Button, Colors, Typography} from '@UIKit';
import {EScreens, ProfileStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.PROFILE_SCREEN
>;

export const ProfileScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('profile.title')}
      </Typography.B28>
      <Button title={'ProfileScreen'} onPress={() => null} />
    </Block>
  );
};

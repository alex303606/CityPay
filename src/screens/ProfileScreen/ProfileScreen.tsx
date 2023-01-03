import React from 'react';
import {Block, Button, ScreenContainer} from '@UIKit';
import {EScreens, ProfileStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.PROFILE_SCREEN
>;

export const ProfileScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <ScreenContainer title={t('profile.title')}>
      <Block justifyContent={'center'} flex={1}>
        <Button
          color={theme.buttonColor}
          title={'ProfileScreen'}
          onPress={() => null}
        />
      </Block>
    </ScreenContainer>
  );
};

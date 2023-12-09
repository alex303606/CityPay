import React, {useCallback} from 'react';
import {IconNames, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import styled from 'styled-components';
import {Image} from 'react-native';
import Share from 'react-native-share';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.POLICY_SCREEN
>;

export const PolicyScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const {url} = route.params;

  const onPressShare = useCallback(async () => {
    Share.open({
      title: '',
      filename: 'Полис',
      url,
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        err && console.log(err);
      });
  }, []);

  return (
    <ScreenContainer
      showButton
      iconName={IconNames.share}
      onPressButton={onPressShare}
      disablePaddings
      title={t('osago.policyScreen.title')}>
      <StyledImage resizeMode={'contain'} source={{uri: url}} />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  flex: 1,
});

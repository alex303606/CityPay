import React from 'react';
import {Block, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {useAppSelector} from '@hooks';
import {getApplicationById, getApplications} from '@store';
import styled from 'styled-components';
import {Image} from 'react-native';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.APPLICATION_SCREEN
>;

export const ApplicationScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {id} = route.params;
  const application = useAppSelector(getApplicationById(id));
  console.log(application);

  if (!application) {
    return null;
  }

  return (
    <ScreenContainer scroll={false} title={t('osago.infoPaymentScreen.title')}>
      <Block flex={1}>
        <StyledImage source={{uri: application.selectedPartner.logoUrl}} />
      </Block>
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});

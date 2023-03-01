import {
  Block,
  Colors,
  EShadow,
  Icon,
  Row,
  ScreenContainer,
  ShadowsSizes,
  Typography,
} from '@UIKit';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.PAYMENTS_BY_QR_SCREEN
>;

export const PaymentByQRScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const {
    params: {icon},
  } = route;
  return (
    <ScreenContainer title={t('fines.title')}>
      <Row alignItems={'center'} justifyContent={'space-between'}>
        <Typography.R20 numberOfLines={2} color={theme.textColor}>
          {t('fines.paymentByCode')}
        </Typography.R20>
        <StyledBlock backgroundColor={Colors.white} marginRight={8}>
          <Icon name={icon} size={32} color={Colors.blue} />
        </StyledBlock>
      </Row>
    </ScreenContainer>
  );
};

const StyledBlock = styled(Block)({
  borderRadius: 10,
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: ShadowsSizes[EShadow.S],
});

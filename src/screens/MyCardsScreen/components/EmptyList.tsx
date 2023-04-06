import React from 'react';
import {Block, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {Image} from 'react-native';

const emptyPayments = require('@assets/images/empty_payments.webp');

export const EmptyList: React.FC = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  return (
    <Block justifyContent={'center'} flex={1} alignItems={'center'}>
      <StyledImage resizeMode={'contain'} source={emptyPayments} />
      <Typography.B18 textAlign={'center'} color={theme.textColor}>
        {t('profile.emptyCards')}
      </Typography.B18>
    </Block>
  );
};

const StyledImage = styled(Image)({
  width: 250,
  height: 250,
  marginBottom: 32,
});

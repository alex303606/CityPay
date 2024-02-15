import React from 'react';
import {Block, Typography} from '@UIKit';
import styled from 'styled-components';
import {Image} from 'react-native';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';

const emptyImage = require('@assets/images/empty-image.webp');

export const EmptyOsagoScreen: React.FC = () => {
  const {theme} = useTheme();

  const {t} = useTranslation();

  return (
    <Block flex={1} alignItems={'center'}>
      <StyledImage resizeMode="contain" source={emptyImage} />
      <Typography.B18
        marginTop={32}
        textAlign={'center'}
        color={theme.textColor}>
        {t('osago.emptyDescription')}
      </Typography.B18>
    </Block>
  );
};

const StyledImage = styled(Image)({
  width: 250,
});

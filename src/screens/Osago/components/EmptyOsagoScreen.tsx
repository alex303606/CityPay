import React from 'react';
import {Block, Button, ScreenContainer, Typography} from '@UIKit';
import styled from 'styled-components';
import {Image} from 'react-native';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';

const emptyImage = require('@assets/images/empty-image.webp');

type Props = {
  onPress: () => void;
};

export const EmptyOsagoScreen: React.FC<Props> = ({onPress}) => {
  const {theme} = useTheme();

  const {t} = useTranslation();

  return (
    <ScreenContainer scroll={false} title={t('osago.title')}>
      <Block flex={1} alignItems={'center'}>
        <StyledImage resizeMode="contain" source={emptyImage} />
        <Typography.B18
          marginTop={32}
          textAlign={'center'}
          color={theme.textColor}>
          {t('osago.emptyDescription')}
        </Typography.B18>
      </Block>

      <Button title={t('osago.applyOsago')} onPress={onPress} />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 250,
});

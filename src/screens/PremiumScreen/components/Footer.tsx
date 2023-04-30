import React from 'react';
import {Colors, Row, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

export const Footer: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Row
      alignItems={'center'}
      justifyContent={'center'}
      paddingHorizontal={8}
      paddingVertical={16}>
      <StyledText numberOfLines={1} textAlign={'center'} color={Colors.white}>
        {t('premium.agreement')}
      </StyledText>
      <Row flex={1} justifyContent={'center'}>
        <StyledText numberOfLines={1} textAlign={'center'} color={Colors.white}>
          {t('premium.restorePurchase')}
        </StyledText>
      </Row>
      <StyledText numberOfLines={1} textAlign={'center'} color={Colors.white}>
        {t('premium.eula')}
      </StyledText>
    </Row>
  );
};

const StyledText = styled(Typography.RF12)(() => ({
  minWidth: 90,
}));

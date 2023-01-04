import {Colors, Row, Typography} from '@UIKit';
import React from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useTheme} from '@hooks';

type Props = {
  text: string;
  secondText?: string;
  onPress?: () => void;
};

export const Item: React.FC<Props> = ({text, secondText, onPress}) => {
  const {theme} = useTheme();

  const Container = onPress ? StyledPressable : Row;

  return (
    <Container
      onPress={onPress}
      justifyContent={'space-between'}
      marginBottom={8}
      paddingVertical={8}
      paddingRight={16}>
      <Typography.B18 numberOfLines={1} color={theme.textColor}>
        {text}
      </Typography.B18>
      {!!secondText && (
        <Typography.R16 numberOfLines={1} color={theme.textColor}>
          {secondText}
        </Typography.R16>
      )}
    </Container>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
  paddingVertical: 8,
  paddingRight: 16,
});

import React, {useCallback} from 'react';
import styled from 'styled-components';
import {ActivityIndicator, Pressable} from 'react-native';
import {Typography, Block, SpacingsProps, Colors} from '@UIKit';
import {useTheme} from '@hooks';

type Props = {
  title: string;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
} & SpacingsProps;

export const Button: React.FC<Props> = ({
  title,
  color,
  textColor = Colors.white,
  onPress,
  disabled,
  loading,
  ...props
}) => {
  const onPressHandler = useCallback(() => {
    return disabled || loading ? undefined : onPress();
  }, [disabled, loading, onPress]);

  const {theme} = useTheme();

  return (
    <Block overflow borderRadius={10} {...props}>
      <StyledPressable
        color={color || theme.buttonColor}
        disabled={disabled}
        onPress={onPressHandler}>
        {loading ? (
          <ActivityIndicator size="large" color={'white'} />
        ) : (
          <Typography.S16 color={textColor}>{title}</Typography.S16>
        )}
      </StyledPressable>
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{color: string; disabled?: boolean}>(({color, disabled}) => ({
  flexDirection: 'row',
  padding: 5,
  alignItems: 'center',
  justifyContent: 'center',
  height: 56,
  backgroundColor: disabled ? Colors.grey : color,
}));

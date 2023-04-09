import React from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {Block} from './helpers';
import {Icon, IconNames} from './Icon';
import {useTheme} from '@hooks';
import {Colors} from './constants';

type Props = {
  onPress?: () => void;
  iconColor?: string;
  iconName?: IconNames;
  backgroundColor?: string;
  diameter?: number;
  iconSize?: number;
  elevation?: number;
};

export const RoundButton: React.FC<Props> = ({
  onPress,
  iconName = IconNames.plus,
  diameter = 64,
  iconSize = 48,
  backgroundColor = Colors.transparent,
  elevation,
}) => {
  const {theme} = useTheme();

  return (
    <Wrapper
      elevation={elevation}
      backgroundColor={backgroundColor}
      diameter={diameter}>
      <StyledPressable
        backgroundColor={theme.addCarButtonColor}
        diameter={diameter}
        onPress={onPress}>
        <Icon size={iconSize} color={theme.backgroundColor} name={iconName} />
      </StyledPressable>
    </Wrapper>
  );
};

const Wrapper = styled(Block)<{diameter: number}>(({diameter}) => ({
  borderRadius: diameter / 2,
  overflow: 'hidden',
  width: diameter,
  height: diameter,
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{backgroundColor: string; diameter: number}>(
  ({backgroundColor, diameter}) => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: diameter,
    width: diameter,
    backgroundColor: backgroundColor,
  }),
);

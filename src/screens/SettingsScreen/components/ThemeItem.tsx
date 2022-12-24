import React from 'react';
import {Block, Colors, EShadow, ShadowsSizes, WINDOW_WIDTH} from '@UIKit';
import styled from 'styled-components';
import {Pressable} from 'react-native';

const THEME_ITEM_HEIGHT = 180;

type Props = {
  color: string;
  onPress: () => void;
};

export const ThemeItem: React.FC<Props> = ({onPress, color}) => {
  const width = (WINDOW_WIDTH - 64) / 3;

  return (
    <Wrapper>
      <StyledPressable onPress={onPress} width={width} color={color} />
    </Wrapper>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{color: string; width: number}>(({color, width}) => ({
  width: width,
  height: THEME_ITEM_HEIGHT,
  backgroundColor: color,
  borderRadius: 16,
}));

const Wrapper = styled(Block)({
  borderRadius: 16,
  elevation: ShadowsSizes[EShadow.M],
  overflow: 'hidden',
});

import React from 'react';
import styled from 'styled-components';
import {Block, Colors} from '@UIKit';
import {Pressable} from 'react-native';

export const PremiumItem = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled(Block)({
  paddingHorizontal: 16,
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: Colors.blue,
  height: 150,
});

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

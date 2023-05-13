import React from 'react';
import styled from 'styled-components';
import {Block} from './helpers';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@hooks';

type Props = {
  backgroundColor?: string;
  color?: string;
};

export const Loader: React.FC<Props> = ({backgroundColor, color}) => {
  const {theme} = useTheme();

  return (
    <StyledFloatingBlock color={backgroundColor || theme.backgroundColor}>
      <ActivityIndicator size="large" color={color || theme.textColor} />
    </StyledFloatingBlock>
  );
};

const StyledFloatingBlock = styled(Block)<{color: string}>(({color}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: color,
  alignItems: 'center',
  justifyContent: 'center',
}));

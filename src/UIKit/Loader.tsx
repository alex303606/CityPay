import React from 'react';
import styled from 'styled-components';
import {Block} from './helpers';
import {ActivityIndicator} from 'react-native';
import {Colors} from './constants';

export const Loader: React.FC = () => {
  return (
    <StyledFloatingBlock>
      <ActivityIndicator size="large" color={Colors.blue} />
    </StyledFloatingBlock>
  );
};

const StyledFloatingBlock = styled(Block)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255,255,255,1)',
  alignItems: 'center',
  justifyContent: 'center',
});

import {ScrollView} from 'react-native';
import styled from 'styled-components';
import {Colors} from './constants';
import React, {ReactNode} from 'react';

const StyledScrollView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
}))({});

type Props = {
  children: ReactNode;
};

export const ScrollContainer: React.FC<Props> = ({children}) => {
  return <StyledScrollView>{children}</StyledScrollView>;
};

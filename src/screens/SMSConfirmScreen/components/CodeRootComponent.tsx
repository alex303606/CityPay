import {Block, Row} from '@UIKit';
import React, {ReactNode} from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const CodeRootComponent: React.FC<Props> = ({children}) => (
  <Block alignItems="center">
    <StyledRow justifyContent="space-between">{children}</StyledRow>
  </Block>
);

const StyledRow = styled(Row)({
  width: '100%',
});

import React from 'react';
import {Block, Row} from './helpers';
import {Typography} from './constants';
import {useTheme} from '@hooks';
import styled from 'styled-components';

type Props = {
  title: string;
  marginBottom?: number;
};

export const BlueTitle: React.FC<Props> = ({title, marginBottom}) => {
  const {theme} = useTheme();

  return (
    <Block alignItems={'flex-start'} marginBottom={marginBottom}>
      <StyledRow
        backgroundColor={'rgba(13, 110, 253, 0.5)'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Typography.B16 color={theme.blueTitle}>{title}</Typography.B16>
      </StyledRow>
    </Block>
  );
};

const StyledRow = styled(Row)({
  height: 30,
  paddingHorizontal: 10,
  paddingVertical: 5,
});

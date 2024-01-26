import React from 'react';
import {Block, Row} from './helpers';
import {Colors, Typography} from './constants';
import {useTheme} from '@hooks';
import styled from 'styled-components';

type Props = {
  title: string;
  subTitle?: string;
  value: string | number;
};

export const CalculationCostItem: React.FC<Props> = ({
  title,
  value,
  subTitle,
}) => {
  const {theme} = useTheme();

  return (
    <Row
      alignItems={'center'}
      marginBottom={8}
      flex={1}
      justifyContent={'space-between'}>
      <Block>
        <Typography.B14 marginRight={8} color={theme.textColor}>
          {`${title} ${subTitle ? ':' : ''} `}
          {!!subTitle ? (
            <Typography.B14 color={'#828282'}>{subTitle}</Typography.B14>
          ) : null}
        </Typography.B14>
      </Block>
      <StyledBlock backgroundColor={'#274D89'}>
        <Typography.R14 color={Colors.white}>{value}</Typography.R14>
      </StyledBlock>
    </Row>
  );
};

const StyledBlock = styled(Block)({
  borderRadius: 6,
  padding: 4,
  overflow: 'hidden',
  minWidth: 50,
  alignItems: 'center',
});

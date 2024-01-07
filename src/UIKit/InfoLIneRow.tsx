import React from 'react';
import {Block, Row} from './helpers';
import {Typography} from './constants';
import {useTheme} from '@hooks';

type Props = {
  title: string;
  value: string | number;
};

export const InfoLIneRow: React.FC<Props> = ({title, value}) => {
  const {theme} = useTheme();

  return (
    <Row alignItems={'center'} marginBottom={8} flex={1}>
      <Block flex={1}>
        <Typography.B14 marginRight={8} color={theme.textColor}>
          {title}
        </Typography.B14>
      </Block>
      <Block flex={1}>
        <Typography.R14 color={theme.secondTextColor}>{value}</Typography.R14>
      </Block>
    </Row>
  );
};

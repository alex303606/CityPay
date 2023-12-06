import React from 'react';
import {Row} from './helpers';
import {Typography} from './constants';
import {useTheme} from '@hooks';

type Props = {
  title: string;
  value: string | number;
};

export const InfoLIneRow: React.FC<Props> = ({title, value}) => {
  const {theme} = useTheme();

  return (
    <Row alignItems={'center'} marginBottom={8}>
      <Typography.B16 marginRight={8} color={theme.textColor}>
        {title}
      </Typography.B16>
      <Typography.R18 color={theme.secondTextColor}>{value}</Typography.R18>
    </Row>
  );
};

import React from 'react';
import {useTheme} from '@hooks';
import {Block} from './helpers';
import {Typography} from './constants';

type RowProps = {
  label: string;
  value: string | number | null | undefined;
};

export const PaymentRow: React.FC<RowProps> = ({label, value}) => {
  const {theme} = useTheme();

  if (!value) {
    return null;
  }

  return (
    <Block marginBottom={8}>
      <Typography.B20 color={theme.textColor}>{label}</Typography.B20>
      <Typography.R16 color={theme.textColor}>{value}</Typography.R16>
    </Block>
  );
};

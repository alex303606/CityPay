import React from 'react';
import {Colors, Typography} from '@UIKit';
import {IPayment} from '@store';

type Props = {
  item: IPayment;
};

export const PaymentCard: React.FC<Props> = ({item}) => {
  return (
    <Typography.R20 marginVertical={32} color={Colors.black}>
      {item.paymentNumber}
    </Typography.R20>
  );
};

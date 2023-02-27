import React, {useCallback} from 'react';
import {Block, Colors, Row, Typography} from '@UIKit';
import {IPayment} from '@store';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {useTheme} from '@hooks';

const paidImg = require('@assets/images/paid.webp');

type Props = {
  payment: IPayment;
  onPress: () => void;
};

export const PaymentCard: React.FC<Props> = ({payment, onPress}) => {
  const {theme} = useTheme();
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const date = new Date(payment.dateCreate).toLocaleString('ru', {
    minute: 'numeric',
    hour: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <StyledRow backgroundColor={theme.fineBackgroundColor}>
      <StyledPressable onPress={handlePress}>
        <Block flex={1} justifyContent={'space-between'}>
          <Typography.B18 color={theme.textColor}>
            {payment.number}
          </Typography.B18>
          <Typography.B16 numberOfLines={1} color={theme.textColor}>
            {payment.paymentNumber}
          </Typography.B16>
          <Typography.R14 color={theme.textColor}>{date}</Typography.R14>
        </Block>
        <Block>
          <Row
            marginBottom={8}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Typography.B18 color={theme.textColor}>
              {payment.amount}
            </Typography.B18>
            <Typography.R14 color={theme.textColor}>⊆</Typography.R14>
          </Row>
          {payment.status === '1' && <StyledImage source={paidImg} />}
        </Block>
      </StyledPressable>
    </StyledRow>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 8,
  flexDirection: 'row',
  alignItems: 'flex-start',
});

const StyledRow = styled(Row)({
  borderRadius: 20,
  overflow: 'hidden',
});

const StyledImage = styled(Image)({
  width: 70,
  height: 16,
});

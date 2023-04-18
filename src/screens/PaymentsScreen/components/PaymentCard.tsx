import React, {useCallback} from 'react';
import {Block, Colors, Icon, IconNames, Row, Typography} from '@UIKit';
import {IPayment} from '@store';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useTheme} from '@hooks';

type Props = {
  payment: IPayment;
  onPress: (paymentNumber: string) => void;
};

const DPS = '8';

export const PaymentCard: React.FC<Props> = ({payment, onPress}) => {
  const {theme} = useTheme();
  const handlePress = useCallback(() => {
    onPress(payment.paymentNumber);
  }, [onPress, payment.paymentNumber]);

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
        <StyledIcon
          backgroundColor={
            !!payment.finesType ? theme.buttonColor : Colors.transparent
          }>
          {!!payment.finesType && (
            <Icon
              size={30}
              color={Colors.white}
              name={
                payment.finesType === DPS ? IconNames.police : IconNames.camera
              }
            />
          )}
        </StyledIcon>

        <Block flex={1} justifyContent={'space-between'}>
          <Typography.B18 color={theme.textColor}>
            {payment.number}
          </Typography.B18>
          <Typography.B16 numberOfLines={1} color={theme.textColor}>
            {payment.paymentNumber.substring(
              0,
              payment.paymentNumber.length - 5,
            )}
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
          <StyledStatusRow
            color={
              payment.status_payment === 'Оплачен' ? theme.paidColor : '#FF0000'
            }>
            <StyledStatus
              color={
                payment.status_payment === 'Оплачен'
                  ? theme.paidColor
                  : '#FF0000'
              }>
              {payment.status_payment === 'Оплачен'
                ? 'Оплачено'
                : payment.status_payment}
            </StyledStatus>
          </StyledStatusRow>
        </Block>
      </StyledPressable>
    </StyledRow>
  );
};

const StyledStatus = styled(Typography.B12)({
  textTransform: 'uppercase',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flex: 1,
  paddingHorizontal: 8,
  paddingVertical: 8,
  flexDirection: 'row',
  alignItems: 'flex-start',
});

const StyledRow = styled(Row)({
  borderRadius: 20,
  overflow: 'hidden',
});

const StyledStatusRow = styled(Row)<{color: string}>(({color}) => ({
  transform: 'rotate(20deg)',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderColor: color,
}));

const StyledIcon = styled(Block)({
  width: 40,
  height: 40,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
});

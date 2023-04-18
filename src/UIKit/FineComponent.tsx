import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {Colors, Row, Typography} from '@UIKit';
import {IFine} from '@store';
import {useTheme} from '@hooks';

type Props = {
  fine: IFine;
  onPress: (fine: IFine) => void;
};

export const FineComponent: React.FC<Props> = ({fine, onPress}) => {
  const {theme} = useTheme();
  const date = new Date(fine.violationDate).toLocaleString('ru', {
    minute: 'numeric',
    hour: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  console.log('offlinePaymentStatus = ', fine.offlinePaymentStatus);
  const handlePress = useCallback(() => {
    onPress(fine);
  }, [fine, onPress]);

  return (
    <StyledRow backgroundColor={theme.fineBackgroundColor}>
      <StyledPressable onPress={handlePress}>
        <Row justifyContent={'space-between'}>
          <Typography.B18 color={theme.secondTextColor}>
            {fine.plateNumber}
          </Typography.B18>
          <Row alignItems={'center'}>
            <Typography.B18 color={theme.secondTextColor}>
              {fine.violationAmmount}
            </Typography.B18>
            <Typography.R14 color={theme.secondTextColor}>⊆</Typography.R14>
          </Row>
        </Row>
        <Typography.R14 color={theme.secondTextColor}>{date}</Typography.R14>
        <Typography.R14
          paddingRight={
            fine.paymentStatusName === 'Оплачено' ||
            fine.offlinePaymentStatus === '1'
              ? 80
              : 0
          }
          color={theme.secondTextColor}
          numberOfLines={2}>
          {fine.violationType}
        </Typography.R14>
        {(fine.paymentStatusName === 'Оплачено' ||
          fine.offlinePaymentStatus === '1') && (
          <StyledStatusRow color={theme.paidColor}>
            <StatusText color={theme.paidColor}>Оплачено</StatusText>
          </StyledStatusRow>
        )}
      </StyledPressable>
    </StyledRow>
  );
};

const StyledStatusRow = styled(Row)<{color: string}>(({color}) => ({
  transform: 'rotate(15deg)',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  paddingHorizontal: 5,
  borderColor: color,
  bottom: 24,
  right: 8,
}));

const StatusText = styled(Typography.RF14)({
  textTransform: 'uppercase',
  lineHeight: 24,
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 8,
});

const StyledRow = styled(Row)({
  borderRadius: 20,
  overflow: 'hidden',
});

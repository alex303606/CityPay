import React from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {Colors, Row, Typography} from '@UIKit';
import {IFine} from '@store';
import {useTheme} from '@hooks';

type Props = {
  fine: IFine;
  onPress: () => void;
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

  return (
    <StyledRow backgroundColor={theme.fineBackgroundColor}>
      <StyledPressable onPress={onPress}>
        <Row justifyContent={'space-between'}>
          <Typography.B18>{fine.plateNumber}</Typography.B18>
          <Row alignItems={'center'}>
            <Typography.B18>{fine.violationAmmount}</Typography.B18>
            <Typography.R14>⊆</Typography.R14>
          </Row>
        </Row>
        <Typography.R14>{date}</Typography.R14>
        <Typography.R14 numberOfLines={2}>{fine.violationType}</Typography.R14>
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
});

const StyledRow = styled(Row)({
  borderRadius: 20,
  overflow: 'hidden',
});

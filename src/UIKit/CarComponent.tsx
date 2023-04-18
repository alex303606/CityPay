import {Block, Colors, Row, Typography} from '@UIKit';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {ICar} from '@store';

const flag = require('@assets/images/kg.webp');
const smallFlag = require('@assets/images/kg_small.webp');

type Props = {
  car: ICar;
  onPress?: ({car, isNewNumber}: {car: ICar; isNewNumber: boolean}) => void;
  isNewNumber: boolean;
};

export const CarComponent: React.FC<Props> = ({car, onPress, isNewNumber}) => {
  const onPressHandler = useCallback(() => {
    onPress && onPress({car, isNewNumber});
  }, [isNewNumber, car, onPress]);

  const Button = onPress ? StyledPressable : Row;

  const series = car.number.substring(0, 2);
  const kg = car.number.substring(2, 4);
  const number = car.number.substring(4, car.number.length);

  return (
    <StyledRow backgroundColor={Colors.white}>
      <Button flex={1} onPress={onPressHandler}>
        {isNewNumber ? (
          <StyledBlock
            paddingTop={8}
            paddingBottom={10}
            paddingHorizontal={8}
            justifyContent={'space-between'}>
            <StyledKg34 textAlign={'center'} color={Colors.black}>
              {series}
            </StyledKg34>
            <BottomRow justifyContent={'space-between'} alignItems={'center'}>
              <StyledSmallImage source={smallFlag} resizeMode={'cover'} />
              <StyledKg20 textAlign={'center'} color={Colors.black}>
                {kg}
              </StyledKg20>
            </BottomRow>
          </StyledBlock>
        ) : (
          <StyledImage source={flag} resizeMode={'cover'} />
        )}
        <Row justifyContent={'center'} flex={1} alignItems={'center'}>
          {isNewNumber ? (
            <StyledNewNumber textAlign={'center'} color={Colors.black}>
              {number}
            </StyledNewNumber>
          ) : (
            <StyledNumber textAlign={'center'} color={Colors.black}>
              {car.number}
            </StyledNumber>
          )}
        </Row>
      </Button>
    </StyledRow>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  flex: 1,
});

const StyledRow = styled(Row)({
  height: 65,
  borderWidth: 1,
  borderColor: '#AAAAAA',
  borderRadius: 5,
  overflow: 'hidden',
});

const BottomRow = styled(Row)({
  height: 17,
  alignItems: 'center',
});

const StyledBlock = styled(Block)({
  borderRightWidth: 1,
  borderColor: '#AAAAAA',
  width: 75,
  height: 65,
});

const StyledImage = styled(Image)({
  width: 44,
  height: 63,
  paddingRight: 2,
});

const StyledSmallImage = styled(Image)({
  width: 28,
  height: 17,
});

const StyledKg20 = styled(Typography.RF20)({
  lineHeight: 21,
  textTransform: 'uppercase',
});

const StyledKg34 = styled(Typography.RF28)({
  lineHeight: 30,
});

const StyledNumber = styled(Typography.RF52)({
  textTransform: 'uppercase',
});

const StyledNewNumber = styled(Typography.RF48)({
  textTransform: 'uppercase',
});

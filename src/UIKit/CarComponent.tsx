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
          <StyledBlock padding={8} justifyContent={'space-between'}>
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
          <StyledNumber textAlign={'center'} color={Colors.black}>
            {isNewNumber ? number : car.number}
          </StyledNumber>
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
  padding: 8,
  width: 80,
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

const StyledKg20 = styled(Typography.B18)({
  lineHeight: 21,
  textTransform: 'uppercase',
});

const StyledKg34 = styled(Typography.B28)({
  lineHeight: 30,
});

const StyledNumber = styled(Typography.B48)({
  textTransform: 'uppercase',
});

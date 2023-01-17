import {Block, Colors, Row, Typography} from '@UIKit';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';

const flag = require('@assets/images/kg.webp');
const smallFlag = require('@assets/images/kg_small.webp');

type Props = {
  number: string;
  onPress?: ({
    number,
    isNewNumber,
  }: {
    number: string;
    isNewNumber: boolean;
  }) => void;
  isNewNumber: boolean;
};

export const CarComponent: React.FC<Props> = ({
  number,
  onPress,
  isNewNumber,
}) => {
  const onPressHandler = useCallback(() => {
    onPress && onPress({number, isNewNumber});
  }, [isNewNumber, number, onPress]);

  const Button = onPress ? StyledPressable : Row;

  return (
    <StyledRow backgroundColor={Colors.white}>
      <Button flex={1} onPress={onPressHandler}>
        {isNewNumber ? (
          <StyledBlock padding={8} justifyContent={'space-between'}>
            <StyledKg34 textAlign={'center'} color={Colors.black}>
              07
            </StyledKg34>
            <BottomRow justifyContent={'space-between'} alignItems={'center'}>
              <StyledSmallImage source={smallFlag} resizeMode={'cover'} />
              <StyledKg20 textAlign={'center'} color={Colors.black}>
                KG
              </StyledKg20>
            </BottomRow>
          </StyledBlock>
        ) : (
          <StyledImage source={flag} resizeMode={'cover'} />
        )}
        <Row justifyContent={'center'} flex={1} alignItems={'center'}>
          <Typography.B56 textAlign={'center'} color={Colors.black}>
            {number}
          </Typography.B56>
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
  borderColor: Colors.black,
  borderRadius: 5,
  overflow: 'hidden',
});

const BottomRow = styled(Row)({
  height: 17,
  alignItems: 'center',
});

const StyledBlock = styled(Block)({
  borderRightWidth: 1,
  borderColor: Colors.black,
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
});

const StyledKg34 = styled(Typography.B28)({
  lineHeight: 30,
});

import {Colors, Row, Typography} from '@UIKit';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';

const flag = require('@assets/images/kg.webp');

type Props = {
  number: string;
  onPress?: (number: string) => void;
};

export const CarComponent: React.FC<Props> = ({number, onPress}) => {
  const onPressHandler = useCallback(() => {
    onPress && onPress(number);
  }, [number, onPress]);

  const Button = onPress ? StyledPressable : Row;

  return (
    <StyledRow backgroundColor={Colors.white}>
      <Button flex={1} onPress={onPressHandler}>
        <StyledImage source={flag} resizeMode={'cover'} />
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

const StyledImage = styled(Image)({
  width: 44,
  height: 63,
});

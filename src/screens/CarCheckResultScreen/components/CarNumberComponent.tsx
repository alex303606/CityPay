import React from 'react';
import {Block, Colors, Row, Typography} from '@UIKit';
import styled from 'styled-components';
import {Image} from 'react-native';
const flag = require('@assets/images/kg.webp');
const smallFlag = require('@assets/images/kg_small.webp');
export const CarNumberComponent: React.FC<{carNumber: string}> = ({
  carNumber,
}) => {
  const isNewNumber = !!parseInt(carNumber.substring(0, 2), 10);
  const series = carNumber.substring(0, 2);
  const kg = carNumber.substring(2, 4);
  const number = carNumber.substring(4, carNumber.length);
  return (
    <StyledRow backgroundColor={Colors.white} marginBottom={32}>
      <Row flex={1}>
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
              {carNumber}
            </StyledNumber>
          )}
        </Row>
      </Row>
    </StyledRow>
  );
};

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

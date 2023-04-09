import React, {useCallback} from 'react';
import {Block, Colors, Icon, IconNames, Row, Typography} from '@UIKit';
import {useTheme} from '@hooks';
import {ICard} from '../MyCardsScreen';
import styled from 'styled-components';
import {Pressable} from 'react-native';

type Props = {
  card: ICard;
  onPressDelete: (card: ICard) => void;
};

export const Card: React.FC<Props> = ({card, onPressDelete}) => {
  const {theme} = useTheme();

  const onPressDeleteHandler = useCallback(() => {
    return onPressDelete(card);
  }, [card]);

  return (
    <StyledRow
      backgroundColor={theme.fineBackgroundColor}
      paddingHorizontal={16}
      paddingVertical={8}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Icon color={theme.textColor} name={IconNames.creditCard} size={24} />
      <Typography.S16
        paddingHorizontal={8}
        numberOfLines={1}
        color={theme.textColor}>
        {card.number}
      </Typography.S16>
      <Wrapper>
        <StyledPressable onPress={onPressDeleteHandler}>
          <Icon color={theme.textColor} name={IconNames.delete} size={24} />
        </StyledPressable>
      </Wrapper>
    </StyledRow>
  );
};

const StyledRow = styled(Row)({borderRadius: 8});

const Wrapper = styled(Block)({
  borderRadius: 20,
  overflow: 'hidden',
  width: 40,
  height: 40,
  backgroundColor: 'rgba(18, 18, 29, 0.2)',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
});

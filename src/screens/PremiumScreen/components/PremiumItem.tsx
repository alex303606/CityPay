import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Block, Colors, Typography, WINDOW_WIDTH} from '@UIKit';
import {Pressable} from 'react-native';
import {ISubscription} from '../PremiumScreen';

type Props = {
  active: boolean;
  subscription: ISubscription;
  onPress: (subscription: ISubscription) => void;
};

export const PremiumItem: React.FC<Props> = ({
  active,
  subscription,
  onPress,
}) => {
  const onPressSubscription = useCallback(() => {
    onPress(subscription);
  }, [subscription]);

  return (
    <Wrapper active={active}>
      <StyledPressable onPress={onPressSubscription}>
        <Typography.RF16
          color={Colors.white}
          marginBottom={16}
          textAlign={'center'}>
          {subscription.validity}
        </Typography.RF16>
        <Typography.RF20 textAlign={'center'} color={Colors.white}>
          {subscription.price}
        </Typography.RF20>
      </StyledPressable>
    </Wrapper>
  );
};

const Wrapper = styled(Block)<{active: boolean}>(({active}) => ({
  width: (WINDOW_WIDTH - 32) / 3 - 16,
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: Colors.blue,
  height: 115,
  borderWidth: 2,
  borderColor: active ? '#ff6600' : Colors.blue,
}));

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))(() => ({
  alignItems: 'center',
  paddingVertical: 8,
  flex: 1,
}));

import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Block, Colors, Typography, WINDOW_WIDTH} from '@UIKit';
import {Pressable} from 'react-native';
import * as Model from 'react-native-adapty/lib/dist/types';

type Props = {
  active: boolean;
  subscription: Model.AdaptyProduct;
  onPress: (subscription: Model.AdaptyProduct) => void;
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
          numberOfLines={1}
          color={Colors.white}
          marginBottom={8}
          textAlign={'center'}>
          {subscription.localizedSubscriptionPeriod}
        </Typography.RF16>
        <Typography.RF16
          numberOfLines={1}
          marginBottom={8}
          textAlign={'center'}
          color={Colors.white}>
          {subscription.localizedPrice}
        </Typography.RF16>
        <Typography.RF12 textAlign={'center'} color={Colors.white}>
          {subscription.localizedTitle.split('(')[0]}
        </Typography.RF12>
      </StyledPressable>
    </Wrapper>
  );
};

const Wrapper = styled(Block)<{active: boolean}>(({active}) => ({
  width: (WINDOW_WIDTH - 32) / 3 - 16,
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: Colors.blue,
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
  padding: 4,
  flex: 1,
}));

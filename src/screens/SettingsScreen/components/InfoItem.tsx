import React from 'react';
import {Colors, Icon, IconNames, Typography} from '@UIKit';
import styled from 'styled-components';
import {Pressable} from 'react-native';

type Props = {
  iconName: IconNames;
  text: string;
  onPress: () => void;
};

export const InfoItem: React.FC<Props> = ({text, iconName, onPress}) => {
  return (
    <StyledPressable onPress={onPress}>
      <Typography.R16 numberOfLines={1} color={Colors.black}>
        {text}
      </Typography.R16>
      <Icon color={Colors.black} name={iconName} size={24} />
    </StyledPressable>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 8,
  marginBottom: 8,
  marginHorizontal: 8,
});

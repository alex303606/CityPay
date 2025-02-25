import React, {useCallback} from 'react';
import {Colors, Icon, IconNames, Typography} from '@UIKit';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useTheme} from '@hooks';

type Props = {
  iconName: IconNames;
  text: string;
  onPress: (params: {uri: string; title: string}) => void;
  uri: string;
};

export const InfoItem: React.FC<Props> = ({text, iconName, onPress, uri}) => {
  const onPressHandler = useCallback(() => {
    onPress({uri, title: text});
  }, [onPress, text, uri]);

  const {theme} = useTheme();

  return (
    <StyledPressable onPress={onPressHandler}>
      <Typography.R16 numberOfLines={1} color={theme.textColor}>
        {text}
      </Typography.R16>
      <Icon color={theme.textColor} name={iconName} size={24} />
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

import {Colors, Row, Block, Icon, IconNames, Typography} from '@UIKit';
import React from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useTheme} from '@hooks';

type Props = {
  onPress: () => void;
  iconName: IconNames;
  text: string;
};

export const SelectButton: React.FC<Props> = ({onPress, iconName, text}) => {
  const {theme} = useTheme();

  return (
    <StyledRow backgroundColor={theme.fineBackgroundColor} marginVertical={16}>
      <StyledPressable onPress={onPress}>
        <StyledBlock
          backgroundColor={Colors.blue}
          justifyContent={'center'}
          alignItems={'center'}>
          <Icon name={iconName} color={Colors.white} size={64} />
        </StyledBlock>
        <Typography.R18 padding={16} color={theme.textColor}>
          {text}
        </Typography.R18>
      </StyledPressable>
    </StyledRow>
  );
};

const StyledRow = styled(Row)({
  borderRadius: 20,
  overflow: 'hidden',
  height: 100,
});

const StyledBlock = styled(Block)({
  borderRadius: 20,
  width: 100,
  height: 100,
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
});

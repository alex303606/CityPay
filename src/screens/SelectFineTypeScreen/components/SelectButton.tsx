import {Block, Colors, Icon, IconNames, Row, Typography} from '@UIKit';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useTheme} from '@hooks';

type Props = {
  onPress: (type: string) => void;
  type: string;
  text: string;
};

export const SelectButton: React.FC<Props> = ({onPress, type, text}) => {
  const {theme} = useTheme();

  const onPressHandler = useCallback(() => {
    onPress(type);
  }, [type, onPress]);

  return (
    <StyledRow backgroundColor={theme.fineBackgroundColor} marginVertical={16}>
      <StyledPressable onPress={onPressHandler}>
        <StyledBlock
          backgroundColor={Colors.blue}
          justifyContent={'center'}
          alignItems={'center'}>
          <Icon
            name={type === 'police' ? IconNames.police : IconNames.camera}
            color={Colors.white}
            size={64}
          />
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
  borderWidth: 2,
  borderColor: Colors.white,
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

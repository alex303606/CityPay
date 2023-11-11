import React from 'react';
import {Block, Row} from './helpers';
import {Typography} from './constants';
import {Pressable} from 'react-native';
import {Icon, IconNames} from './Icon';
import {useTheme} from '@hooks';
import styled from 'styled-components';

type Props = {
  marginBottom?: number;
  title: string;
  value: string;
  onPress: () => void;
};

export const DatePickerComponent: React.FC<Props> = ({
  marginBottom,
  title,
  value,
  onPress,
}) => {
  const {theme} = useTheme();

  return (
    <Block marginBottom={marginBottom}>
      <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
        {title}
      </Typography.RF16>
      <StyledRow justifyContent={'space-between'} alignItems={'center'}>
        <Typography.RF16 marginBottom={4} color={theme.textColor}>
          {value}
        </Typography.RF16>
        <Pressable onPress={onPress}>
          <Icon
            name={IconNames.calendar}
            size={24}
            color={theme.tabInactiveColor}
          />
        </Pressable>
      </StyledRow>
    </Block>
  );
};

const StyledRow = styled(Row)({
  borderColor: '#AAAAAA',
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  borderWidth: 1,
  height: 50,
  borderRadius: 10,
  paddingHorizontal: 10,
});

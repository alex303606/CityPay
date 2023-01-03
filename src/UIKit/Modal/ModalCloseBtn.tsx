import type {FC} from 'react';
import React from 'react';
import {Block} from '../helpers';
import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Icon, IconNames} from '../Icon';
import {Colors} from '../constants/Colors';

export interface LeftBtnProps {
  onPress: () => void;
  icon: IconNames;
  color?: string;
}

export const ModalCloseBtn: FC<{onClosePress: () => void}> = ({
  onClosePress,
}) => (
  <Block paddingHorizontal={16}>
    <InputGestureBtn icon={IconNames.close} onPress={onClosePress} />
  </Block>
);

export const InputGestureBtn: React.FC<LeftBtnProps> = ({
  onPress,
  icon,
  color = Colors.black,
}) => (
  <BorderlessButton rippleColor={Colors.ripple} onPress={onPress}>
    <IconWrapper>
      <Icon name={icon} size={24} color={color} />
    </IconWrapper>
  </BorderlessButton>
);

const IconWrapper = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  height: 24,
  width: 24,
  borderRadius: 8,
  overflow: 'hidden',
});

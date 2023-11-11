import React from 'react';
import {Block} from './helpers';
import {Typography} from './constants';
import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';
import {useTheme} from '@hooks';
import {KeyboardTypeOptions} from 'react-native';

type Props = {
  title?: string;
  placeholder?: string;
  marginBottom?: number;
  value: string;
  mask: string;
  changeValueHandler: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export const MaskedInput: React.FC<Props> = ({
  title,
  marginBottom,
  value,
  mask,
  changeValueHandler,
  placeholder,
  keyboardType,
}) => {
  const {theme} = useTheme();

  return (
    <Block marginBottom={marginBottom} flex={1}>
      {!!title ? (
        <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
          {title}
        </Typography.RF16>
      ) : null}
      <StyledTextInputMask
        color={theme.textColor}
        placeholder={placeholder}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        type={'custom'}
        options={{mask: mask}}
        onChangeText={changeValueHandler}
        value={value}
      />
    </Block>
  );
};

const StyledTextInputMask = styled(TextInputMask)<{color: string}>(
  ({color}) => ({
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 20,
    backgroundColor: 'rgba(18, 18, 29, 0.05)',
    paddingHorizontal: 10,
    color,
  }),
);

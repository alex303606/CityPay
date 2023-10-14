import React from 'react';
import {Block} from './helpers';
import {
  KeyboardTypeOptions,
  TextInput,
  TextInputAndroidProps,
} from 'react-native';
import {Typography} from './constants';
import {useTheme} from '@hooks';
import styled from 'styled-components';

type Props = {
  marginBottom?: number;
  onChangeValue: (value: string) => void;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  title?: string;
  autoComplete?: TextInputAndroidProps['autoComplete'];
  disabled?: boolean;
  maxLength?: number;
};
export const InputComponent: React.FC<Props> = ({
  marginBottom,
  onChangeValue,
  value,
  keyboardType,
  placeholder,
  title,
  autoComplete,
  disabled,
  maxLength,
}) => {
  const {theme} = useTheme();

  return (
    <Block marginBottom={marginBottom}>
      {!!title ? (
        <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
          {title}
        </Typography.RF16>
      ) : null}
      <StyledInput
        editable={!disabled}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
    </Block>
  );
};

const StyledInput = styled(TextInput)({
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  paddingHorizontal: 10,
});

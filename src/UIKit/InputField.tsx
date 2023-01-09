import React from 'react';
import styled from 'styled-components';
import {TextInput} from 'react-native';
import {Block, Row} from './helpers';
import {useTheme} from '@hooks';
import {Colors, Typography} from './constants';

type Props = {
  marginBottom?: number;
  value: string;
  label?: string;
  onChangeValue: (value: string) => void;
  placeholder?: string;
};

export const InputField: React.FC<Props> = ({
  marginBottom,
  value,
  onChangeValue,
  label,
  placeholder,
}) => {
  const {theme} = useTheme();
  return (
    <Block>
      {!!label && (
        <Typography.R14 marginBottom={4} numberOfLines={1} color={Colors.grey}>
          {label}
        </Typography.R14>
      )}
      <StyledRow borderColor={theme.textColor} marginBottom={marginBottom}>
        <StyledInput
          placeholder={placeholder}
          color={theme.textColor}
          onChangeText={onChangeValue}
          value={value}
        />
      </StyledRow>
    </Block>
  );
};

const StyledInput = styled(TextInput)<{color: string}>(({color}) => ({
  height: 48,
  fontSize: 16,
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  paddingHorizontal: 8,
  flex: 1,
  color,
}));

const StyledRow = styled(Row)<{borderColor: string}>(({borderColor}) => ({
  width: '100%',
  height: 48,
  borderWidth: 1,
  borderRadius: 8,
  borderColor,
}));

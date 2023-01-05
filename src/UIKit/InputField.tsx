import React from 'react';
import styled from 'styled-components';
import {TextInput} from 'react-native';
import {Row} from './helpers';
import {useTheme} from '@hooks';

type Props = {
  marginBottom?: number;
  value: string;
  onChangeValue: (value: string) => void;
};

export const InputField: React.FC<Props> = ({
  marginBottom,
  value,
  onChangeValue,
}) => {
  const {theme} = useTheme();
  return (
    <StyledRow borderColor={theme.textColor} marginBottom={marginBottom}>
      <StyledInput
        color={theme.textColor}
        onChangeText={onChangeValue}
        value={value}
      />
    </StyledRow>
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

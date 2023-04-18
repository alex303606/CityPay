import React from 'react';
import styled from 'styled-components';
import {KeyboardType, Pressable, TextInput} from 'react-native';
import {Block, Row} from './helpers';
import {useTheme} from '@hooks';
import {Colors, Typography} from './constants';
import {Icon, IconNames} from './Icon';

type Props = {
  marginBottom?: number;
  value: string;
  label?: string;
  onChangeValue?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  keyboardType?: KeyboardType;
  disabled?: boolean;
  showAdditionalButton?: boolean;
  onPress?: () => void;
};

export const InputField: React.FC<Props> = ({
  marginBottom,
  value,
  onChangeValue,
  label,
  placeholder,
  maxLength,
  keyboardType = 'default',
  disabled,
  showAdditionalButton = false,
  onPress,
}) => {
  const {theme} = useTheme();

  return (
    <StyledBlock>
      {!!label && (
        <Typography.R16
          marginBottom={4}
          numberOfLines={2}
          color={theme.textColor}>
          {label}
        </Typography.R16>
      )}
      <StyledRow marginBottom={marginBottom}>
        <StyledInput
          editable={disabled}
          placeholderTextColor={theme.textColor}
          placeholder={placeholder}
          color={theme.textColor}
          onChangeText={onChangeValue}
          value={value}
          numberOfLines={1}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
        {showAdditionalButton && (
          <StyledIconBlock
            paddingHorizontal={8}
            alignItems={'center'}
            justifyContent={'center'}>
            <StyledPressable onPress={onPress}>
              <Icon
                name={IconNames.qrCode}
                size={32}
                color={theme.buttonColor}
              />
            </StyledPressable>
          </StyledIconBlock>
        )}
      </StyledRow>
    </StyledBlock>
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

const StyledIconBlock = styled(Block)({
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  height: '100%',
  overflow: 'hidden',
});

const StyledRow = styled(Row)({
  width: '100%',
  height: 48,
  borderWidth: 1,
  borderRadius: 8,
  borderColor: '#AAAAAA',
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  alignItems: 'center',
  overflow: 'hidden',
});

const StyledBlock = styled(Block)({
  width: '100%',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({});

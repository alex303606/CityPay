import React from 'react';
import {Block, Row} from './helpers';
import {
  Image,
  ImageSourcePropType,
  KeyboardTypeOptions,
  Pressable,
  TextInput,
  TextInputAndroidProps,
  TextInputProps,
} from 'react-native';
import {Colors, Typography} from './constants';
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
  autoCapitalize?: TextInputProps['autoCapitalize'];
  disabled?: boolean;
  maxLength?: number;
  icon?: ImageSourcePropType;
  onIconPress?: () => void;
  error?: boolean;
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
  icon,
  onIconPress,
  error,
  autoCapitalize,
}) => {
  const {theme} = useTheme();

  return (
    <Block marginBottom={marginBottom}>
      <Row alignItems="center">
        {!!title ? (
          <Typography.RF16
            marginBottom={4}
            color={error ? theme.red : theme.tabInactiveColor}>
            {title}
          </Typography.RF16>
        ) : null}
        {!!icon ? (
          <StyledImageWrapper>
            <StyledPressable onPress={onIconPress}>
              <StyledImage source={icon} />
            </StyledPressable>
          </StyledImageWrapper>
        ) : null}
      </Row>
      <StyledInput
        color={theme.textColor}
        placeholderTextColor={theme.textColor}
        editable={!disabled}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
      />
    </Block>
  );
};

const StyledInput = styled(TextInput)<{color: string}>(({color}) => ({
  borderRadius: 10,
  overflow: 'hidden',
  borderColor: '#AAAAAA',
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  borderWidth: 1,
  paddingHorizontal: 8,
  fontSize: 18,
  color,
}));

const StyledImage = styled(Image)({
  width: 13,
  height: 13,
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  width: 13,
  height: 13,
});

const StyledImageWrapper = styled(Block)({
  width: 13,
  height: 13,
  borderRadius: 3,
  overflow: 'hidden',
  marginLeft: 8,
});

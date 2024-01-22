import React from 'react';
import {Block, Row} from './helpers';
import {Typography} from './constants';
import {Icon, IconNames} from './Icon';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';

type Props = {
  marginBottom?: number;
  title: string;
  value: string | undefined;
  onChangeText: (value: string) => void;
  error?: boolean;
};

const MASK = '99.99.9999';

export const DatePickerComponent: React.FC<Props> = ({
  marginBottom,
  title,
  value,
  onChangeText,
  error,
}) => {
  const {theme} = useTheme();

  return (
    <Block marginBottom={marginBottom}>
      <Typography.RF16
        color={error ? theme.red : theme.tabInactiveColor}
        marginBottom={4}>
        {title}
      </Typography.RF16>
      <StyledRow justifyContent={'space-between'} alignItems={'center'}>
        <StyledTextInputMask
          placeholder={'01.01.2000'}
          color={theme.textColor}
          keyboardType={'number-pad'}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          type={'custom'}
          options={{mask: MASK}}
          onChangeText={onChangeText}
          value={value}
        />
        <Icon
          name={IconNames.calendar}
          size={24}
          color={theme.tabInactiveColor}
        />
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

const StyledTextInputMask = styled(TextInputMask)<{color: string}>(
  ({color}) => ({
    fontSize: 20,
    color,
    flex: 1,
  }),
);

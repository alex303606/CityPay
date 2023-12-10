import React, {useCallback} from 'react';
import {Block, Row} from './helpers';
import {Typography} from './constants';
import {Picker} from '@react-native-picker/picker';
import styled from 'styled-components';
import {useTheme} from '@hooks';

type Item = {
  label: string;
  value: string | null;
};

type Props = {
  items: Item[];
  selectedValue: string | null | number;
  onValueChange: (itemValue: any) => void;
  title: string;
  marginBottom?: number;
  numberOfLines?: number;
};

export const PickerComponent: React.FC<Props> = ({
  items,
  selectedValue,
  onValueChange,
  title,
  marginBottom,
  numberOfLines,
}) => {
  const {theme} = useTheme();

  const renderItem = useCallback((item: Item) => {
    return (
      <Picker.Item key={item.value} label={item.label} value={item.value} />
    );
  }, []);

  return (
    <Block marginBottom={marginBottom}>
      <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
        {title}
      </Typography.RF16>
      <StyledRow>
        <StyledPicker
          color={theme.textColor}
          dropdownIconColor={theme.textColor}
          selectedValue={selectedValue}
          numberOfLines={numberOfLines}
          onValueChange={onValueChange}>
          {items.map(renderItem)}
        </StyledPicker>
      </StyledRow>
    </Block>
  );
};

const StyledPicker = styled(Picker)<{color: string}>(({color}) => ({
  flex: 1,
  color,
}));

const StyledRow = styled(Row)({
  borderRadius: 10,
  overflow: 'hidden',
  borderColor: '#AAAAAA',
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  borderWidth: 1,
  paddingHorizontal: 5,
});

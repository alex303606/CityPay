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
  selectedValue: string | null;
  onValueChange: (itemValue: any) => void;
  title: string;
};

export const PickerComponent: React.FC<Props> = ({
  items,
  selectedValue,
  onValueChange,
  title,
}) => {
  const {theme} = useTheme();

  const renderItem = useCallback((item: Item) => {
    return (
      <Picker.Item key={item.value} label={item.label} value={item.value} />
    );
  }, []);

  return (
    <Block>
      <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
        {title}
      </Typography.RF16>
      <StyledRow>
        <StyledPicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}>
          {items.map(renderItem)}
        </StyledPicker>
      </StyledRow>
    </Block>
  );
};

const StyledPicker = styled(Picker)({
  flex: 1,
});

const StyledRow = styled(Row)({
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  paddingHorizontal: 10,
});

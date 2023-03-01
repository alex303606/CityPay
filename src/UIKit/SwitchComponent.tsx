import React from 'react';
import styled from 'styled-components';
import {Switch, View} from 'react-native';
import {Colors, Typography} from './constants';
import {Row} from './helpers';

const trackColor = {
  true: 'rgba(155,155,155,0.3)',
  false: 'rgba(155,155,155,0.3)',
};

type Props = {
  onValueChange: (v: boolean) => void;
  value: boolean;
  text: string;
};

export const SwitchComponent: React.FC<Props> = ({
  onValueChange,
  value,
  text,
}) => {
  return (
    <Row alignItems="center" marginVertical={10}>
      <TextContainer>
        <Typography.R16 color={Colors.grey} numberOfLines={1}>
          {text}
        </Typography.R16>
      </TextContainer>
      <Switch
        trackColor={trackColor}
        thumbColor={value ? '#2AA952' : Colors.white}
        value={value}
        onValueChange={onValueChange}
      />
    </Row>
  );
};

const TextContainer = styled(View)`
  padding-right: 16px;
  flex: 1;
`;

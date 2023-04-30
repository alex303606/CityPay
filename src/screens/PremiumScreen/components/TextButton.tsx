import React from 'react';
import styled from 'styled-components';
import {Colors, Typography} from '@UIKit';

type Props = {
  title: string;
  onPress: () => void;
};

export const TextButton: React.FC<Props> = ({title, onPress}) => {
  return (
    <StyledText onPress={onPress} numberOfLines={1}>
      {title}
    </StyledText>
  );
};

const StyledText = styled(Typography.RF12)({
  minWidth: 90,
  textAlign: 'center',
  color: Colors.white,
});

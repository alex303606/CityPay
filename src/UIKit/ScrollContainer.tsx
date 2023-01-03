import {ScrollView} from 'react-native';
import styled from 'styled-components';
import React, {ReactNode} from 'react';
import {useTheme} from '@hooks';

type StyledScrollViewProps = {
  backgroundColor: string;
};

const StyledScrollView = styled(ScrollView).attrs<StyledScrollViewProps>(
  ({backgroundColor}) => ({
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: backgroundColor,
    },
  }),
)<StyledScrollViewProps>({});

type Props = {
  children: ReactNode;
};

export const ScrollContainer: React.FC<Props> = ({children}) => {
  const {theme} = useTheme();

  return (
    <StyledScrollView backgroundColor={theme.backgroundColor}>
      {children}
    </StyledScrollView>
  );
};

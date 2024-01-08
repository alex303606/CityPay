import {RefreshControl, ScrollView} from 'react-native';
import styled from 'styled-components';
import React, {ReactNode, useCallback} from 'react';
import {useLoading, useTheme} from '@hooks';

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
  reload?: () => Promise<void>;
  scrollViewRef?: React.RefObject<ScrollView>;
};

export const ScrollContainer: React.FC<Props> = ({
  children,
  reload,
  scrollViewRef,
}) => {
  const {theme} = useTheme();
  const {loading, hideLoader, showLoader} = useLoading();

  const handleReload = useCallback(async () => {
    if (reload) {
      showLoader();
      await reload();
      hideLoader();
    }
  }, [hideLoader, reload, showLoader]);

  return (
    <StyledScrollView
      ref={scrollViewRef}
      refreshControl={
        reload ? (
          <RefreshControl refreshing={loading} onRefresh={handleReload} />
        ) : undefined
      }
      backgroundColor={theme.backgroundColor}>
      {children}
    </StyledScrollView>
  );
};

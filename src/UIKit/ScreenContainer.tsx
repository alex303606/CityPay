import React, {ReactNode} from 'react';
import {Block, Row} from './helpers/Layout';
import {ScrollContainer} from './ScrollContainer';
import {Typography} from './constants';
import {useTheme} from '@hooks';

type Props = {
  children: ReactNode;
  title: string;
};

export const ScreenContainer: React.FC<Props> = ({children, title}) => {
  const {theme} = useTheme();

  return (
    <Block flex={1}>
      <Row
        paddingHorizontal={16}
        paddingBottom={16}
        paddingTop={32}
        backgroundColor={theme.backgroundColor}>
        <Typography.B28 numberOfLines={1} color={theme.textColor}>
          {title}
        </Typography.B28>
      </Row>
      <ScrollContainer>
        <Block flex={1} paddingBottom={32} paddingHorizontal={16}>
          {children}
        </Block>
      </ScrollContainer>
    </Block>
  );
};

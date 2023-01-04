import React, {ReactNode} from 'react';
import {Block, Row} from './helpers/Layout';
import {ScrollContainer} from './ScrollContainer';
import {Colors, Typography} from './constants';
import {useTheme} from '@hooks';
import {Icon, IconNames} from './Icon';
import styled from 'styled-components';
import {Pressable} from 'react-native';

type Props = {
  children: ReactNode;
  title: string;
  showButton?: boolean;
  onPressButton?: () => void;
};

export const ScreenContainer: React.FC<Props> = ({
  children,
  title,
  showButton = false,
  onPressButton,
}) => {
  const {theme} = useTheme();

  return (
    <Block flex={1}>
      <Row
        paddingHorizontal={16}
        paddingBottom={16}
        paddingTop={32}
        backgroundColor={theme.backgroundColor}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Typography.B28 numberOfLines={1} color={theme.textColor}>
          {title}
        </Typography.B28>
        {showButton && (
          <Wrapper>
            <StyledPressable onPress={onPressButton}>
              <Icon color={theme.textColor} name={IconNames.help} size={24} />
            </StyledPressable>
          </Wrapper>
        )}
      </Row>
      <ScrollContainer>
        <Block flex={1} paddingBottom={32} paddingHorizontal={16}>
          {children}
        </Block>
      </ScrollContainer>
    </Block>
  );
};

const Wrapper = styled(Block)({
  borderRadius: 20,
  overflow: 'hidden',
  width: 40,
  height: 40,
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
});

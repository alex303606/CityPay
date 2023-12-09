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
  title?: string;
  showButton?: boolean;
  onPressButton?: () => void;
  reload?: () => Promise<void>;
  scroll?: boolean;
  disablePaddings?: boolean;
  iconName?: IconNames;
  color?: string;
};

export const ScreenContainer: React.FC<Props> = ({
  children,
  title,
  showButton = false,
  onPressButton,
  reload,
  scroll = true,
  iconName = IconNames.settings,
  color,
  disablePaddings,
}) => {
  const {theme} = useTheme();
  const ScrollComponent = scroll ? ScrollContainer : Block;

  return (
    <Block flex={1}>
      <Row
        paddingHorizontal={16}
        paddingBottom={16}
        paddingTop={32}
        backgroundColor={theme.backgroundColor}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Typography.B28 numberOfLines={2} color={theme.textColor}>
          {title}
        </Typography.B28>
        {showButton && (
          <Wrapper>
            <StyledPressable onPress={onPressButton}>
              <Icon
                color={color || theme.textColor}
                name={iconName}
                size={30}
              />
            </StyledPressable>
          </Wrapper>
        )}
      </Row>
      <ScrollComponent
        flex={1}
        reload={reload}
        backgroundColor={theme.backgroundColor}>
        <Block
          flex={1}
          paddingBottom={16}
          paddingHorizontal={disablePaddings ? 0 : 16}>
          {children}
        </Block>
      </ScrollComponent>
    </Block>
  );
};

const Wrapper = styled(Block)({
  borderRadius: 23,
  overflow: 'hidden',
  width: 46,
  height: 46,
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
  width: 46,
  height: 46,
});

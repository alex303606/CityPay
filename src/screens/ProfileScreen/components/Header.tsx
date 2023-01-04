import React from 'react';
import {Block, Icon, IconNames, Row, Typography} from '@UIKit';
import styled from 'styled-components';
import {useTheme} from '@hooks';

export const Header: React.FC = () => {
  const {theme} = useTheme();

  return (
    <Row
      marginBottom={32}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Wrapper borderColor={theme.textColor}>
        <Icon color={theme.textColor} name={IconNames.profile} size={48} />
        {/*<StyledImage resizeMode="contain" source={empty} />*/}
      </Wrapper>
      <Block paddingLeft={16} flex={1}>
        <Typography.B20 color={theme.textColor}>
          Алексей Остриков
        </Typography.B20>
        <Typography.B16 color={theme.textColor} numberOfLines={1}>
          +996554303606
        </Typography.B16>
      </Block>
    </Row>
  );
};

const Wrapper = styled(Block)<{borderColor: string}>(({borderColor}) => ({
  borderRadius: 40,
  overflow: 'hidden',
  width: 80,
  height: 80,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor,
  borderWidth: 3,
}));

// const StyledImage = styled(Image)({
//   width: 100,
//   height: 100,
// });

import React from 'react';
import {Block, Icon, IconNames, Row, Typography} from '@UIKit';
import styled from 'styled-components';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';

type Props = {
  name: string;
  lastName: string;
  phone: string;
};

export const Header: React.FC<Props> = ({name, lastName, phone}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();

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
          {name || t('profile.name')} {lastName || t('profile.lastName')}
        </Typography.B20>
        <Typography.B16 color={theme.textColor} numberOfLines={1}>
          {phone}
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

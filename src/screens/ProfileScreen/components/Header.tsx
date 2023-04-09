import React from 'react';
import {Block, Colors, Icon, IconNames, Row, Typography} from '@UIKit';
import styled from 'styled-components';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';
import {Image, Pressable} from 'react-native';

type Props = {
  name: string;
  lastName: string;
  phone: string;
  handleChangeAvatar: () => void;
  avatar: string;
};

export const Header: React.FC<Props> = ({
  name,
  lastName,
  phone,
  handleChangeAvatar,
  avatar,
}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  return (
    <Row
      marginBottom={32}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Wrapper borderColor={theme.textColor}>
        <StyledPressable onPress={handleChangeAvatar}>
          {avatar ? (
            <StyledImage resizeMode="cover" source={{uri: avatar}} />
          ) : (
            <Icon color={theme.textColor} name={IconNames.profile} size={48} />
          )}
        </StyledPressable>
      </Wrapper>
      <Block paddingLeft={16} flex={1}>
        <Typography.R20 color={theme.textColor}>
          {name || t('profile.name')} {lastName || t('profile.lastName')}
        </Typography.R20>
        <Typography.R16 color={theme.textColor} numberOfLines={1}>
          {phone}
        </Typography.R16>
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

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
});

const StyledImage = styled(Image)({
  width: 100,
  height: 100,
});

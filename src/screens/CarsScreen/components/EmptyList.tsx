import React from 'react';
import {Block, Colors, Icon, IconNames, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';

export const EmptyList = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  return (
    <Block justifyContent={'center'} flex={1} alignItems={'center'}>
      <Icon size={128} color={Colors.grey} name={IconNames.myAuto} />
      <Typography.B18
        marginTop={32}
        textAlign={'center'}
        color={theme.textColor}>
        {t('cars.empty')}
      </Typography.B18>
    </Block>
  );
};

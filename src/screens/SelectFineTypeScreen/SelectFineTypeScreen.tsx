import React from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';

export const SelectFineTypeScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <ScreenContainer title={t('fines.title')}>
      <Typography.R16 marginBottom={16} color={Colors.grey}>
        {t('fines.selectType')}
      </Typography.R16>
    </ScreenContainer>
  );
};

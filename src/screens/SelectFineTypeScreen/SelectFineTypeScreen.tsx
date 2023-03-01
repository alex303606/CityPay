import React, {useCallback} from 'react';
import {Colors, IconNames, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {SelectButton} from './components/SelectButton';

export const SelectFineTypeScreen: React.FC = () => {
  const {t} = useTranslation();

  const onPressCamera = useCallback(() => {
    return;
  }, []);

  const onPressPolice = useCallback(() => {
    return;
  }, []);

  return (
    <ScreenContainer title={t('fines.title')}>
      <Typography.R16 marginBottom={16} color={Colors.grey}>
        {t('fines.selectType')}
      </Typography.R16>
      <SelectButton
        text={t('fines.cameraFine')}
        iconName={IconNames.camera}
        onPress={onPressCamera}
      />
      <SelectButton
        text={t('fines.policeFine')}
        iconName={IconNames.police}
        onPress={onPressPolice}
      />
    </ScreenContainer>
  );
};

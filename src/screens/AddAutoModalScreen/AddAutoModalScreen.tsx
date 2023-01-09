import React, {useCallback, useState} from 'react';
import {Button, InputField, ScreenContainer, SwitchComponent} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';

export const AddAutoModalScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const [pushValue, changePushValue] = useState<boolean>(false);

  const handleChangePush = useCallback((value: boolean) => {
    changePushValue(value);
  }, []);

  const [number, setNumber] = useState<string>('');
  const [pin, setPin] = useState<string>('');

  const onChangePin = useCallback((value: string) => {
    setPin(value);
  }, []);

  const onChangeNumber = useCallback((value: string) => {
    setNumber(value);
  }, []);

  const addAutoHandler = useCallback(() => {
    return;
  }, []);

  return (
    <ScreenContainer title={t('cars.addAuto')}>
      <SwitchComponent
        onValueChange={handleChangePush}
        text={t('settings.pushLabel')}
        value={pushValue}
      />
      <InputField
        label={t('cars.pin.label')}
        placeholder={t('cars.pin.placeholder')}
        onChangeValue={onChangePin}
        marginBottom={16}
        value={pin}
        maxLength={14}
        keyboardType={'numeric'}
      />
      <InputField
        label={t('cars.number.label')}
        placeholder={t('cars.number.placeholder')}
        onChangeValue={onChangeNumber}
        marginBottom={16}
        value={number}
      />
      <Button
        color={theme.buttonColor}
        title={t('cars.addAuto')}
        onPress={addAutoHandler}
      />
    </ScreenContainer>
  );
};

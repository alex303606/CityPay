import React, {useCallback, useState} from 'react';
import {Button, InputField, ScreenContainer, SwitchComponent} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {
  useAppSelector,
  useReloadCarList,
  useSnackbarNotification,
  useTheme,
} from '@hooks';
import {editCar, getUserState} from '@store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.MODAL_ADD_CAR>;

export const AddAutoModalScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {showNotification} = useSnackbarNotification();
  const {phone} = useAppSelector(getUserState);
  const {reloadCarList} = useReloadCarList();

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

  const addAutoHandler = useCallback(async () => {
    const response = await editCar({
      phone,
      number,
      inn: pin,
      active: true,
    });
    if (!response?.result) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    await reloadCarList();
    navigation.goBack();
  }, [navigation, number, phone, pin, reloadCarList, showNotification, t]);

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

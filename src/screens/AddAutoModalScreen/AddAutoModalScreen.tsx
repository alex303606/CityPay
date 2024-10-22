import React, {useCallback, useState} from 'react';
import {Button, InputField, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {
  useAppSelector,
  useReloadCarList,
  useSnackbarNotification,
  useTheme,
} from '@hooks';
import {editCar, getFinesListByCarNumberAndPin, getUserState} from '@store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<CarsStackParamList, EScreens.MODAL_ADD_CAR>;

export const AddAutoModalScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {showNotification} = useSnackbarNotification();
  const {phone} = useAppSelector(getUserState);
  const {reloadCarList} = useReloadCarList();
  const [number, setNumber] = useState<string>('');
  const [pin, setPin] = useState<string>('');

  const onChangePin = useCallback((value: string) => {
    setPin(value);
  }, []);

  const onChangeNumber = useCallback((value: string) => {
    setNumber(value);
  }, []);

  const addAutoHandler = useCallback(async () => {
    if (pin.length !== 14) {
      return showNotification(t('cars.pin.error'));
    }
    if (number.length < 6) {
      return showNotification(t('cars.number.error'));
    }
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
    await getFinesListByCarNumberAndPin({
      numbers: [number],
      inns: [pin],
      infocom: true,
      save: true,
    });
    await reloadCarList();
    navigation.goBack();
  }, [navigation, number, phone, pin, reloadCarList, showNotification, t]);

  return (
    <ScreenContainer title={t('cars.addAuto')}>
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

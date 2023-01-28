import {Block, Button, ModalContainer} from '@UIKit';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {editCar, getUserState} from '@store';
import {
  useAppSelector,
  useReloadCarList,
  useSnackbarNotification,
} from '@hooks';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.MODAL_DELETE_CAR
>;

export const ModalDeleteCar: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {car} = route.params;
  const {showNotification} = useSnackbarNotification();

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const {phone} = useAppSelector(getUserState);
  const {reloadCarList} = useReloadCarList();

  const handleDeleteCar = useCallback(async () => {
    const response = await editCar({
      phone,
      number: car.number,
      inn: car.inn,
      active: false,
    });
    if (!response?.result) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    await reloadCarList();
    navigation.navigate(EScreens.CARS_SCREEN);
  }, [
    phone,
    car.number,
    car.inn,
    reloadCarList,
    navigation,
    showNotification,
    t,
  ]);

  return (
    <ModalContainer title={t('cars.deleteCar', {number: car.number})}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('cars.delete')}
          onPress={handleDeleteCar}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};

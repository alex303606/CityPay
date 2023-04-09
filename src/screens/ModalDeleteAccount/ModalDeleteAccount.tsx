import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Block, Button, ModalContainer} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';
import {useAppDispatch, useAppSelector, useLoading} from '@hooks';
import {
  clearCars,
  clearFines,
  clearPayments,
  clearSettings,
  editCar,
  eraseAccount,
  getCars,
  getUserState,
  signOut,
} from '@store';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MODAL_DELETE_ACCOUNT_SCREEN
>;

export const ModalDeleteAccount: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const cars = useAppSelector(getCars);
  const {phone} = useAppSelector(getUserState);
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDeleteAccount = useCallback(async () => {
    showLoader();
    const deletedCars = cars.map(async car => {
      return await editCar({
        phone,
        number: car.number,
        inn: car.inn,
        active: false,
      });
    });
    await Promise.all([deletedCars]);
    await eraseAccount(phone);
    hideLoader();
    dispatch(signOut());
    dispatch(clearFines());
    dispatch(clearCars());
    dispatch(clearPayments());
    dispatch(clearSettings());
  }, []);

  return (
    <ModalContainer title={t('profile.deleteAcc')}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          loading={loading}
          marginVertical={8}
          title={t('profile.delete')}
          onPress={handleDeleteAccount}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};

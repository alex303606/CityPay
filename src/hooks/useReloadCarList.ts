import {useCallback} from 'react';
import {getCarList, getCarsSuccess, getUserState} from '@store';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useAppDispatch, useAppSelector} from './store';
import {useTranslation} from 'react-i18next';

export const useReloadCarList = () => {
  const {showNotification} = useSnackbarNotification();
  const {phone} = useAppSelector(getUserState);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const reloadCarList = useCallback(async () => {
    const response = await getCarList(phone);
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response.result) {
      if (response.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    dispatch(
      getCarsSuccess({
        cars: response.cars,
      }),
    );
  }, [dispatch, phone, showNotification, t]);
  return {
    reloadCarList,
  };
};

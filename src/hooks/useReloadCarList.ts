import {useCallback} from 'react';
import {getCarList, getCarsSuccess, getUserState} from '@store';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useAppDispatch, useAppSelector} from './store';
import {useTranslation} from 'react-i18next';
import {useLoading} from './useLoading';

export const useReloadCarList = () => {
  const {showNotification} = useSnackbarNotification();
  const {phone} = useAppSelector(getUserState);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();

  const reloadCarList = useCallback(async () => {
    showLoader();
    const response = await getCarList(phone);
    hideLoader();
    if (!response?.result) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    dispatch(
      getCarsSuccess({
        cars: response.cars,
      }),
    );
  }, [dispatch, hideLoader, phone, showLoader, showNotification, t]);
  return {
    reloadCarList,
    loading,
  };
};

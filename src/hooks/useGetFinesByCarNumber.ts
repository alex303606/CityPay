import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useCallback} from 'react';
import {getFinesListByCarNumberAndPin, ICar} from '@store';
import {useLoading} from './useLoading';

export const useGetFinesByCarNumber = (car: ICar) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();

  const getFinesByCarNumberAndPin = useCallback(async () => {
    showLoader();
    const response = await getFinesListByCarNumberAndPin({
      numbers: [car.number],
      inns: [car.inn],
    });
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
    return response.data;
  }, [car.inn, car.number, hideLoader, showLoader, showNotification, t]);

  return {
    getFinesByCarNumberAndPin,
    loading,
  };
};

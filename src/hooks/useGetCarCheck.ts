import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {getUserState, getFreeCarCheckInfoByCarNumber} from '@store';
import {useCallback} from 'react';

export const useGetCarCheck = () => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const {selectedLanguage, phone} = useAppSelector(getUserState);

  const getCarCheckHandler = useCallback(
    async (carNumber: string) => {
      showLoader();
      const response = await getFreeCarCheckInfoByCarNumber({
        phone,
        carNumber,
        lang: selectedLanguage,
      });
      hideLoader();
      if (!response?.result) {
        if (response?.message) {
          return showNotification(response.message);
        }
        return showNotification(t('errors.carDatNotFound'));
      }
      if (!response?.data) {
        return showNotification(t('errors.somethingWentWrong'));
      }

      if (response.data) {
        console.log(response.data);
      }
    },
    [dispatch, hideLoader, phone, showLoader, showNotification, t],
  );
  return {
    getCarCheckHandler,
    loading,
  };
};

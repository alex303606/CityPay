import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useCallback} from 'react';
import {getPaymentDetails} from '@store';
import {useLoading} from './useLoading';

export const useGetPaymentByPaymentNumber = (paymentNumber: string) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();

  const getPaymentByPaymentNumber = useCallback(async () => {
    showLoader();
    const response = await getPaymentDetails(paymentNumber);
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
  }, [hideLoader, paymentNumber, showLoader, showNotification, t]);

  return {
    getPaymentByPaymentNumber,
    loading,
  };
};

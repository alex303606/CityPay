import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch} from './store';
import {getPaymentsSuccess, getTotalSum} from '@store';
import {useCallback} from 'react';

export const useGetTotalSum = ({
  isHasToCard,
  isKgRegistrations,
  partnerId,
  productId,
  selectedPeriodId,
}: {
  partnerId: string;
  isHasToCard: boolean;
  isKgRegistrations: boolean;
  productId: string;
  selectedPeriodId: string;
}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const getTotalSumHandler = useCallback(async () => {
    showLoader();
    const response = await getTotalSum({
      isHasToCard,
      isKgRegistrations,
      partnerId,
      productId,
      selectedPeriodId,
    });

    hideLoader();
    if (!response?.result) {
      if (!response?.data) {
        dispatch(
          getPaymentsSuccess({
            payments: [],
          }),
        );
      }
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }

    if (response.data) {
      return response.data;
    }

    return null;
  }, [dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    getTotalSumHandler,
    loading,
  };
};

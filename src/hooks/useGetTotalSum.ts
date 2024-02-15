import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {getPaymentsSuccess, getTotalSum, getUserState} from '@store';
import {useCallback} from 'react';
import {IDriver} from '../screens/Osago/types';

export const useGetTotalSum = ({
  isHasToCard,
  isKgRegistrations,
  partnerId,
  productId,
  selectedPeriodId,
  carTypeParamId,
  driversState,
  deliveryId,
}: {
  partnerId: string;
  isHasToCard: boolean;
  isKgRegistrations: boolean;
  productId: string;
  selectedPeriodId: string;
  carTypeParamId: string;
  deliveryId: string;
  driversState: IDriver[];
}) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const {selectedLanguage} = useAppSelector(getUserState);

  const getTotalSumHandler = useCallback(async () => {
    showLoader();
    const response = await getTotalSum({
      isHasToCard,
      isKgRegistrations,
      partnerId,
      productId,
      selectedPeriodId,
      lang: selectedLanguage,
      carTypeParamId,
      driversState,
      deliveryId,
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

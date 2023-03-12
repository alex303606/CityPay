import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {getPaymentsSuccess, getPaymentsList, getUserState} from '@store';
import {useCallback} from 'react';

export const useGetPaymentsList = () => {
  const {phone} = useAppSelector(getUserState);

  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const getPaymentsListHandler = useCallback(async () => {
    showLoader();
    const response = await getPaymentsList({phone});
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
      dispatch(
        getPaymentsSuccess({
          payments: response.data,
        }),
      );
    }
  }, [dispatch, hideLoader, phone, showLoader, showNotification, t]);
  return {
    getPaymentsListHandler,
    loading,
  };
};

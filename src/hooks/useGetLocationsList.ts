import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch} from './store';
import {useCallback} from 'react';
import {getLocationsList, getLocationsListSuccess} from '../store/osago';

export const useGetLocationsList = () => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const getLocationsListHandler = useCallback(async () => {
    showLoader();
    const response = await getLocationsList();
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

    if (response.data) {
      dispatch(getLocationsListSuccess(response.data));
    }
  }, [dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    getLocationsListHandler,
    loading,
  };
};

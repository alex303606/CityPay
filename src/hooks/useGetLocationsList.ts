import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {useCallback} from 'react';
import {getLocationsList, setLocationsListSuccess} from '../store/osago';
import {getUserState} from '@store';

export const useGetLocationsList = () => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const {selectedLanguage} = useAppSelector(getUserState);

  const getLocationsListHandler = useCallback(async () => {
    showLoader();
    const response = await getLocationsList(selectedLanguage);
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
      dispatch(setLocationsListSuccess(response.data));
    }
  }, [dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    getLocationsListHandler,
    loading,
  };
};

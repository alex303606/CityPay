import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {useCallback} from 'react';
import {getApplicationsList, getUserState, setApplicationsList} from '@store';

export const useGetApplicationsList = () => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const {phone} = useAppSelector(getUserState);
  const {selectedLanguage} = useAppSelector(getUserState);
  const getApplicationsListHandler = useCallback(async () => {
    showLoader();
    const response = await getApplicationsList(phone, selectedLanguage);
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
      dispatch(setApplicationsList(response.data));
    }
  }, [dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    getApplicationsListHandler,
    loading,
  };
};

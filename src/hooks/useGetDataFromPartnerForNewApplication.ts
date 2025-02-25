import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {
  getDataFromPartnerForNewApplication,
  getUserState,
  setNewApplication,
} from '@store';
import {useCallback} from 'react';

export const useGetDataFromPartnerForNewApplication = (partnerId: string) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const {selectedLanguage} = useAppSelector(getUserState);

  const getDataFromPartnerForNewApplicationHandler = useCallback(async () => {
    showLoader();
    const response = await getDataFromPartnerForNewApplication(
      partnerId,
      selectedLanguage,
    );
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
      dispatch(setNewApplication(response.data));
    }
  }, [dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    getDataFromPartnerForNewApplicationHandler,
    loading,
  };
};

import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useCallback} from 'react';
import {
  getFinesListByCarNumberAndPin,
  getFinesSuccess,
  ICar,
  IFine,
} from '@store';
import {useAppDispatch} from './store';

export const useGetFinesByAllCarsNumberAndPin = (cars: ICar[]) => {
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();

  const getFinesByAllCarsNumberAndPin = useCallback(async () => {
    if (cars.length === 0) {
      return;
    }
    const numbers = cars.map(c => c.number);
    const inns = cars.map(c => c.inn);
    showLoader();
    const response = await getFinesListByCarNumberAndPin({
      numbers,
      inns,
    });
    hideLoader();
    if (!response?.result) {
      if (!response?.data) {
        dispatch(
          getFinesSuccess({
            fines: [],
          }),
        );
      }
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }

    if (response.data) {
      const fines = response.data.reduce((acc, fineArr) => {
        fineArr.forEach(fine => acc.push(fine));
        return acc;
      }, [] as IFine[]);

      dispatch(
        getFinesSuccess({
          fines,
        }),
      );
    }
  }, [cars, dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    getFinesByAllCarsNumberAndPin,
    loading,
  };
};

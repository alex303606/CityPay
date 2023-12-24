import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackbarNotification} from './useSnackbarNotification';
import {useLoading} from './useLoading';
import {useAppDispatch, useAppSelector} from './store';
import {
  createNewApplication,
  getUserState,
  ICreateNewApplicationParams,
  IPartner,
} from '@store';
import {DriverPhotos, IDriver, MyDataState} from '../screens/Osago/types';
import {NativeModules} from 'react-native';

const {MbankSecondModule} = NativeModules;

const MbankSecondModuleInitPayment = ({
  payUserId,
  payAmount,
  phone,
  orderId,
  resultUrl,
}: {
  payUserId: string | null;
  orderId: string | null;
  payAmount: number;
  phone: string;
  resultUrl: string;
}) =>
  MbankSecondModule.initPayment(
    orderId,
    payUserId,
    payAmount,
    phone,
    resultUrl,
  );

export const useCreateNewApplication = ({
  driversState,
  state,
  partner,
  driversPhotos,
}: {
  driversState: IDriver[];
  state: MyDataState;
  partner: IPartner;
  driversPhotos: DriverPhotos[];
}) => {
  console.log(driversPhotos);
  const {t} = useTranslation();
  const {showNotification} = useSnackbarNotification();
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const {phone, userId} = useAppSelector(getUserState);

  let params: ICreateNewApplicationParams;

  // driversState.forEach((driver, index) => {
  //   params.driver1firstname = driver.name;
  // });

  const createNewApplicationHandler = useCallback(async () => {
    showLoader();
    const response = await createNewApplication({
      phone: phone,
      images: driversPhotos,
      insuranceTypeId: '',
      selectedPartnerId: '',
      isOwner: true,
      isHasToCard: true,
      isKgRegistration: state.carRegisteredInKr,
      selectedProductId: '',
      selectedPeriodId: '',
      contactPhone: phone,
      email: state.email,
      carTypeId: '',
      carTypeParamId: '',
      carNumber: '',
      carVendor: '',
      carModel: state.carModel,
      carYear: state.yearOfIssue,
      carVin: '',
      deliveryId: true,
      deliveryAddress: state.whereToDeliver,
      isPickup: state.needDelivery,
      pickupOfficeId: '',
    });
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
      const resultUrl = `https://citysoft.kido.kg/api/merchants_paybox.php?user_phone=999?paymentCode=000?amount=1000?isMbank=1`;
      MbankSecondModuleInitPayment({
        orderId: '0',
        payAmount: 1000,
        phone: phone,
        payUserId: userId,
        resultUrl,
      });
    }
  }, [dispatch, hideLoader, showLoader, showNotification, t]);
  return {
    createNewApplicationHandler,
    loading,
  };
};

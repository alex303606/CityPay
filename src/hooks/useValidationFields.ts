import {IDriver, IErrorFieldsState, MyDataState} from '../screens/Osago/types';
import {useCallback} from 'react';
import {validateEmail} from '../utils';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {EScreens, OsagoStackParamList} from '@navigators';
import {IPartner} from '@store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';

const validateDate = (value: string) => {
  const date = moment();
  const today = moment(value, 'DD/MM/YYYY');
  const diff = Boolean(date.diff(today));
  if (!diff || !value) {
    return true;
  }
  return date.diff(today) < 0;
};

export const useValidationFields = (
  state: MyDataState,
  setErrorFieldsState: (errorFieldsState: IErrorFieldsState) => void,
  errorFieldsState: IErrorFieldsState,
  scrollToTop: () => void,
  navigation: NativeStackNavigationProp<
    OsagoStackParamList,
    EScreens.NEW_STATEMENT_SCREEN
  >,
  partner: IPartner,
) => {
  const {t} = useTranslation();
  // const deliveryList = useAppSelector(getDeliveryList);

  const validate = useCallback(
    (
      isDelivery: boolean,
      driversState: IDriver[],
      setDrivers: (drivers: IDriver[]) => void,
    ) => {
      let newErrorFieldsState = {...errorFieldsState};

      const emailIsValid = validateEmail(state.email);

      // const delivery = deliveryList.find(
      //   delivery => delivery.id === state.deliveryId,
      // );
      //
      // const isDelivery = !!delivery?.isDelivery;

      newErrorFieldsState = {
        ...newErrorFieldsState,
        email: !emailIsValid,
        carVendor: !state.carVendor,
        carNumber: !state.carNumber,
        carModel: !state.carModel,
        carYear: !state.carYear || Number(state.carYear) > moment().year(),
        carVin: !state.carVin,
        contactPhone: !state.contactPhone,
        carType: !state.carType,
        carTypeParamId: !state.carTypeParamId,
        product: !state.product,
        selectedPeriodId: !state.selectedPeriodId,
        deliveryAddress: isDelivery ? !state.deliveryAddress : false,
        pickUpOffice: isDelivery ? false : !state.pickUpOffice,
      };

      const newDriversState = [...driversState];

      newDriversState.forEach(driver => {
        const pinIsValid = !!driver.pin && driver.pin.length === 14;

        driver.errors.pin = !pinIsValid;
        driver.errors.name = !driver.name;
        driver.errors.surname = !driver.surname;
        driver.errors.class = !driver.class;
        driver.errors.driverLicenseDate = validateDate(
          driver.driverLicenseDate,
        );
        driver.errors.date = validateDate(driver.date);
      });

      setDrivers(newDriversState);

      setErrorFieldsState(newErrorFieldsState);

      const driversErrors = newDriversState.reduce((acc, driver) => {
        Object.values(driver.errors).forEach(e => {
          acc.push(e);
        });
        return acc;
      }, [] as boolean[]);

      if (
        driversErrors.some(error => error) ||
        Object.values(newErrorFieldsState).some(value => value)
      ) {
        return Alert.alert(t('osago.statementScreen.error'), undefined, [
          {text: 'OK', onPress: scrollToTop},
        ]);
      }

      return navigation.navigate(EScreens.DOCUMENTS_SCREEN, {
        numberOfDrivers: driversState.length,
        state,
        driversState,
        partner,
      });
    },
    [errorFieldsState, state],
  );

  return {
    validate,
  };
};

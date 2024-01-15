import {IDriver, IErrorFieldsState, MyDataState} from '../screens/Osago/types';
import {useCallback} from 'react';
import {validateEmail} from '../utils';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {EScreens, OsagoStackParamList} from '@navigators';
import {getDeliveryList, IPartner} from '@store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from './store';

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
  const deliveryList = useAppSelector(getDeliveryList);

  const validate = useCallback(
    (driversState: IDriver[], setDrivers: (drivers: IDriver[]) => void) => {
      let newErrorFieldsState = {...errorFieldsState};

      const emailIsValid = validateEmail(state.email);

      const delivery = deliveryList.find(
        delivery => delivery.id === state.deliveryId,
      );

      const isDelivery = !!delivery?.isDelivery;

      newErrorFieldsState = {
        ...newErrorFieldsState,
        email: !emailIsValid,
        carVendor: !state.carVendor,
        carNumber: !state.carNumber,
        carModel: !state.carModel,
        carYear: !state.carYear,
        carVin: !state.carVin,
        contactPhone: !state.contactPhone,
        carType: !state.carType,
        product: !state.product,
        selectedPeriodId: !state.selectedPeriodId,
        deliveryAddress: isDelivery ? !state.deliveryAddress : false,
        pickUpOffice: isDelivery ? false : !state.pickUpOffice,
      };

      const newDriversState = [...driversState];

      newDriversState.forEach(driver => {
        driver.errors.pin = !driver.pin || driver.pin.length !== 14;
        driver.errors.name = !driver.name;
        driver.errors.surname = !driver.surname;
        driver.errors.class = !driver.class;
      });

      setDrivers(newDriversState);

      setErrorFieldsState(newErrorFieldsState);

      if (Object.values(newErrorFieldsState).some(value => value)) {
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

import {IDriver, IErrorFieldsState, MyDataState} from '../screens/Osago/types';
import {useCallback} from 'react';
import {validateEmail} from '../utils';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {EScreens, OsagoStackParamList} from '@navigators';
import {IPartner} from '@store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useValidationFields = (
  state: MyDataState,
  setErrorFieldsState: (errorFieldsState: IErrorFieldsState) => void,
  errorFieldsState: IErrorFieldsState,
  scrollToTop: () => void,
  navigation: NativeStackNavigationProp<
    OsagoStackParamList,
    EScreens.NEW_STATEMENT_SCREEN
  >,
  driversState: IDriver[],
  partner: IPartner,
  setDrivers: (drivers: IDriver[]) => void,
) => {
  const {t} = useTranslation();

  const validate = useCallback(() => {
    let newErrorFieldsState = {...errorFieldsState};
    const emailIsValid = validateEmail(state.email);

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
    };

    const newDriversState = [...driversState];
    newDriversState.forEach(driver => {
      driver.errors.pin = !driver.pin;
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
  }, [errorFieldsState, state]);

  return {
    validate,
  };
};

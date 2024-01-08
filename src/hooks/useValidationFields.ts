import {IDriver, IErrorFieldsState, MyDataState} from '../screens/Osago/types';
import {useCallback} from 'react';
import {EScreens, OsagoStackParamList} from '@navigators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IPartner} from '@store';
import {useTranslation} from 'react-i18next';

export const useValidationFields = (
  state: MyDataState,
  navigation: NativeStackNavigationProp<
    OsagoStackParamList,
    EScreens.NEW_STATEMENT_SCREEN
  >,
  driversState: IDriver[],
  partner: IPartner,
  scrollToTop: () => void,
  setErrorFieldsState: (errorFieldsState: IErrorFieldsState) => void,
  errorFieldsState: IErrorFieldsState,
) => {
  const {t} = useTranslation();

  const validate = useCallback(() => {
    const newErrorFieldsState = {...errorFieldsState};
    newErrorFieldsState.email = true;
    newErrorFieldsState.carVendor = !state.carVendor;

    setErrorFieldsState(newErrorFieldsState);
  }, [errorFieldsState, state]);

  // Alert.alert(t('osago.statementScreen.error'), undefined, [
  //   {text: 'OK', onPress: scrollToTop},
  // ]);

  return {
    validate,
  };
};

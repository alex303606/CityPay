import {IDriver, MyDataState} from '../screens/Osago/types';
import {useCallback} from 'react';
import {EScreens, OsagoStackParamList} from '@navigators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IPartner} from '@store';

export const useValidationFields = (
  state: MyDataState,
  navigation: NativeStackNavigationProp<
    OsagoStackParamList,
    EScreens.NEW_STATEMENT_SCREEN
  >,
  driversState: IDriver[],
  partner: IPartner,
  scrollToTop: () => void,
) => {
  const validate = useCallback(() => {
    scrollToTop();
    // navigation.navigate(EScreens.DOCUMENTS_SCREEN, {
    //   numberOfDrivers: driversState.length,
    //   state,
    //   driversState,
    //   partner,
    // });
  }, [state]);
  return {
    validate,
  };
};

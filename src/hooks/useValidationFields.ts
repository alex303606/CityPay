import {MyDataState} from '../screens/Osago/types';
import {useCallback} from 'react';

export const useValidationFields = (state: MyDataState) => {
  const validate = useCallback(() => {
    return {
      error: true,
      errorField: '',
    };
  }, [state]);
  return {
    validate,
  };
};

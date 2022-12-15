import RNSnackbar from 'react-native-snackbar/src';
import {useCallback} from 'react';

export const useSnackbarNotification = () => {
  const showNotification = useCallback((snackbarText: string) => {
    RNSnackbar.show({
      text: snackbarText,
      duration: RNSnackbar.LENGTH_LONG,
      position: RNSnackbar.POSITION.ALONG_TARGET_BOTTOM,
      margins: {
        left: 16,
        right: 16,
        bottom: 16,
      },
    });
  }, []);

  return {
    showNotification,
  };
};

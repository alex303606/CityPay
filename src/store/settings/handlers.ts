import axios from 'axios';
export type SettingsResponse = {
  isEwalletPaymentActive: number;
  isPaymentActive: number;
  merchantSystem: number;
  premiumCarsLimit: number;
  standardCarsLimit: number;
};
export const getAppSettings = () => {
  return axios
    .post('', {
      TYPE: 'get_app_settings',
    })
    .then(
      (response: {
        data: {
          data: SettingsResponse;
          result: boolean;
          message: string;
        };
      }) => {
        if (response && response.data) {
          return response.data;
        }
      },
    )
    .catch(error => console.warn(error));
};

import axios from 'axios';
import {ILanguages} from '@store';
export const getFreeCarCheckInfoByCarNumber = ({
  phone,
  carNumber,
  lang,
}: {
  phone: string;
  carNumber: string;
  lang: ILanguages;
}) => {
  return axios
    .post('', {
      TYPE: 'get_free_carcheck_info_by_car_number',
      PHONE_NUMBER: phone,
      CAR_NUMBER: carNumber,
      LANG: lang,
    })
    .then(
      (response: {
        data: {
          data: any;
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

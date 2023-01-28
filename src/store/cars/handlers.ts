import axios from 'axios';
import {ICar} from './reducer';

export const getCarList = (phone: string) => {
  return axios
    .post('', {
      TYPE: 'get_car_list',
      PHONE: phone,
    })
    .then(
      (response: {
        data: {
          data: ICar[];
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

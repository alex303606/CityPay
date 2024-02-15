import axios from 'axios';
import {ICarCheckCar, ICarCheckPeriods, ILanguages} from '@store';
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
          data: {
            car: ICarCheckCar[];
            periods: ICarCheckPeriods[];
            paidVersionAvalible: boolean;
          };
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

export const getCarcheckPaymentCode = ({
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
      TYPE: 'get_carcheck_payment_code',
      PHONE_NUMBER: phone,
      CAR_NUMBER: carNumber,
      LANG: lang,
    })
    .then(
      (response: {
        data: {
          data: {
            paymentNumber: string;
          };
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

export const getCarcheckPaymentCode2 = ({
  phone,
  carNumber,
  lang,
  paymentCode,
}: {
  phone: string;
  carNumber: string;
  paymentCode: string;
  lang: ILanguages;
}) => {
  return axios
    .post('', {
      TYPE: 'get_carcheck_payment_code',
      PHONE_NUMBER: phone,
      CAR_NUMBER: carNumber,
      PAYMENT_CODE: paymentCode,
      LANG: lang,
    })
    .then(
      (response: {
        data: {
          data: {
            car: ICarCheckCar[];
            periods: ICarCheckPeriods[];
            images: string[];
          };
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

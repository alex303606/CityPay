import axios from 'axios';

export type IFine = {
  address: string;
  birthdate: string;
  carBrand: string;
  carModel: string;
  certEcpExpire: Date;
  deliveryDate: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  paymentNumber: string;
  paymentStatus: string;
  paymentStatusName: string;
  plateNumber: string;
  protocolNumber: string;
  violationAmmount: string;
  violationArticle: string;
  violationDate: Date;
  violationImage: string;
  violationPlace: string;
  violationType: string;
  offlinePaymentStatus: string;
};

export const getFinesListByCarNumber = ({number}: {number: string}) => {
  return axios
    .post('', {
      TYPE: 'get_fines_list_by_car_number',
      NUMBER: number,
    })
    .then(
      (response: {
        data: {
          data: null;
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

export const getFinesListByCarNumberAndPin = ({
  numbers,
  inns,
  save = false,
  infocom = false,
}: {
  numbers: string[];
  inns: string[];
  save?: boolean;
  infocom?: boolean;
}) => {
  return axios
    .post('', {
      TYPE: 'get_fines_list_by_car_number_and_pin',
      NUMBERS: numbers,
      INNS: inns,
      SAVE: save,
      INFOCOM: infocom,
    })
    .then(
      (response: {
        data: {
          data: IFine[][] | null;
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

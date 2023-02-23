import axios from 'axios';

export type IPayment = {
  amount: number;
  article: string;
  cardholderName: string;
  currency: '';
  dateCreate: Date;
  datePayment: string;
  errorCode: string;
  errorMessage: string;
  finesType: string;
  inn: string;
  ip: string;
  number: string;
  order_id: string;
  pan: string;
  paymentBank: number;
  paymentNumber: string;
  paymentService: number;
  paymentSum: number;
  phone: string;
  protocolNumber: string;
  status: string;
  status_payment: string;
  username: string;
};

export const getPaymentsList = ({phone}: {phone: string}) => {
  return axios
    .post('', {
      TYPE: 'get_payments_list',
      PHONE: phone,
    })
    .then(
      (response: {
        data: {
          data: IPayment[];
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

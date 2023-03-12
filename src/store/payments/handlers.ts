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

export const getPaymentDetails = (paymentNumber: string) => {
  return axios
    .post('', {
      TYPE: 'get_payment_details',
      PAYMENT_NUMBER: paymentNumber,
    })
    .then(
      (response: {
        data: {
          data: IPayment;
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

export const getCurrentAmount = (paymentCode: string) => {
  return axios
    .post('', {
      TYPE: 'get_current_amount',
      PAYMENT_CODE: paymentCode,
    })
    .then(
      (response: {
        data: {
          data: {
            current_amount: number | null;
            totalAmount: number;
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

type AddPaymentParams = {
  paymentNumber: string;
  amount: string;
  phone: string;
  inn?: string;
  finesType?: string;
  article?: string;
  number?: string;
  protocolNumber?: string;
};

export const addPayment = ({
  paymentNumber,
  amount,
  phone,
  inn = 'не указан',
  number = '-',
  article = '-',
  protocolNumber = '',
  finesType = '-',
}: AddPaymentParams) => {
  return axios
    .post('', {
      TYPE: 'add_payment_megapay',
      USERNAME: 'anonymous',
      INN: inn,
      NUMBER: number,
      ARTICLE: article,
      PROTOCOL_NUMBER: protocolNumber,
      PAYMENT_NUMBER: `${paymentNumber}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`,
      AMOUNT: amount,
      STATUS: false,
      PHONE: phone,
      FINES_TYPE: finesType,
    })
    .then(
      (response: {
        data: {
          data: {
            paymentSum: string;
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

import axios from 'axios';

type ICarResponse = {
  INN: string;
  NUMBER: string;
};

export const getCarList = (phone: string) => {
  return axios
    .post('', {
      TYPE: 'get_car_list',
      PHONE: phone,
    })
    .then(
      (response: {
        data: {
          data: ICarResponse[];
          result: boolean;
          message: string;
        };
      }) => {
        if (response && response.data) {
          const cars = response.data.data.map((car: ICarResponse) => {
            return {
              number: car.NUMBER,
              inn: car.INN,
            };
          });
          return {
            cars,
            ...response.data,
          };
        }
      },
    )
    .catch(error => console.warn(error));
};

export const editCar = ({
  phone,
  inn,
  number,
  active,
}: {
  phone: string;
  inn: string;
  number: string;
  active: boolean;
}) => {
  return axios
    .post('', {
      TYPE: 'edit_car',
      PHONE: phone,
      INN: inn,
      NUMBER: number,
      ACTIVE: active,
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

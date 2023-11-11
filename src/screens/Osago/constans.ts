import {IDriver} from './types';

export const NUMBER_OF_DRIVERS = [
  {
    label: 'Авто водит несколько водителей',
    value: 'Авто водит несколько водителей',
  },
  {
    label: 'Авто водит 1 водитель',
    value: 'Авто водит 1 водитель',
  },
];

export const VALIDITY = [
  {label: '1 год', value: '1'},
  {label: '2 года', value: '2'},
  {label: '3 года', value: '3'},
];

export const MASK = '+996 999 99-99-99';

export const DRIVER: IDriver = {
  date: new Date(631144800000),
  driverLicenseDate: new Date(631144800000),
  pin: '',
  surname: '',
  name: '',
  secondName: '',
  class: '',
};

export const initialDriversState: IDriver[] = [DRIVER];
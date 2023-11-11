export type MyDataState = {
  iAmTheOwner: boolean;
  iHaveCard: boolean;
  carRegisteredInKr: boolean;
  numberOfDrivers: string;
  validity: string;
  email: string;
  phone: string;
};

export type IDriver = {
  date: Date;
  driverLicenseDate: Date;
  pin: string;
  surname: string;
  name: string;
  secondName: string;
  class: string;
};

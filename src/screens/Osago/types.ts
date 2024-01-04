export type MyDataState = {
  iAmTheOwner: boolean;
  iHaveCard: boolean;
  carRegisteredInKr: boolean;
  needDelivery: boolean;
  IAmAgree: boolean;
  numberOfDrivers: string;
  validity: string;
  email: string;
  phone: string;
  carModel: string;
  model: string;
  yearOfIssue: string;
  carType: string;
  numberOfSeats: string;
  engineCapacity: string;
  motorPower: string;
  loadCapacity: string;
  engineNumber: string;
  whereToDeliver: string;
  whereToPick: string;
  insuranceTypeId: string;
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

export type IPhoto = {
  base64: string;
  fileName: string;
  type: string;
  uri: string;
};

export type DriverPhotos = {
  idCard: IPhoto[];
  driverLicense: IPhoto[];
  powerAttorney: IPhoto[];
};

export type ICarDocuments = {
  registration: IPhoto[];
  registrationCard: IPhoto[];
};

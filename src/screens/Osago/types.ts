export type MyDataState = {
  isOwner: boolean;
  isHasToCard: boolean;
  isKgRegistration: boolean;
  isPickUp: boolean;
  IAmAgree: boolean;
  numberOfDrivers: string;
  selectedPeriodId: string;
  email: string;
  phone: string;
  carVendor: string;
  carModel: string;
  carYear: string;
  carType: string;
  numberOfSeats: string;
  engineCapacity: string;
  motorPower: string;
  loadCapacity: string;
  carVin: string;
  whereToDeliver: string;
  pickUpOffice: string;
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

export type MyDataState = {
  isOwner: boolean;
  isHasToCard: boolean;
  isKgRegistration: boolean;
  product: string;
  selectedPeriodId: string;
  email: string;
  phone: string;
  contactPhone: string;
  carVendor: string;
  carNumber: string;
  carModel: string;
  carYear: string;
  carType: string;
  carTypeParamId: string;
  carVin: string;
  deliveryAddress: string;
  pickUpOffice: string;
  insuranceTypeId: string;
  deliveryId: string;
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

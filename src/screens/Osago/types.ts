export type MyDataState = {
  isOwner: boolean;
  isHasToCard: boolean;
  isKgRegistration: boolean;
  product: string | undefined;
  selectedPeriodId: string | undefined;
  email: string;
  phone: string;
  contactPhone: string;
  carVendor: string;
  carNumber: string;
  carModel: string;
  carYear: string;
  carType: string | undefined;
  carTypeParamId: string | undefined;
  carVin: string;
  deliveryAddress: string;
  pickUpOffice: string | undefined;
  insuranceTypeId: string | undefined;
  deliveryId: string | undefined;
};

export type IDriverErrors = {
  pin: boolean;
  surname: boolean;
  name: boolean;
  class: boolean;
  driverLicenseDate: boolean;
  date: boolean;
};

export type IDriver = {
  date: string;
  driverLicenseDate: string;
  pin: string;
  surname: string;
  name: string;
  secondName: string;
  class: string;
  errors: IDriverErrors;
};

export type IPhoto = {
  fileName: string;
  type: string;
  uri: string;
};

export type DriverPhotos = {
  idCard: IPhoto[];
  driverLicense: IPhoto[];
};

export type ICarDocuments = {
  registration: IPhoto[];
  registrationCard: IPhoto[];
  powerOfAttorney: IPhoto[];
};

export type IErrorFieldsState = {
  email: boolean;
  carVendor: boolean;
  carNumber: boolean;
  carModel: boolean;
  carYear: boolean;
  carVin: boolean;
  contactPhone: boolean;
  carType: boolean;
  product: boolean;
  selectedPeriodId: boolean;
  deliveryAddress: boolean;
  pickUpOffice: boolean;
  carTypeParamId: boolean;
};

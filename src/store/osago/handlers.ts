import axios from 'axios';

export type IPartner = {
  id: string;
  logoUrl: string;
  name: string;
};

export type ILocation = {
  id: string;
  partnersId: string[];
  title: string;
};

export type ILocationsList = {
  partnersList: IPartner[];
  locationsList: ILocation[];
};

export type IApplication = {
  anotherDriversCount: number;
  cancelInformation: string;
  carModel: string;
  carNumber: string;
  carTypeSelectedParameterTitle: string;
  carTypeTitle: string;
  carVIN: string;
  carVendor: string;
  carYear: string;
  contactEmail: string;
  contactPhone: string;
  createInformation: null;
  date: '24.11.2023';
  deliveryAddress: string | null;
  endDate: null;
  id: string;
  insurancePolicyNumber: null;
  insurancePolicyUrl: string[];
  isHasTOCard: true;
  isKGRegistrations: true;
  isNeedDelivery: false;
  isOwner: true;
  paymentRecieptNumber: string | null;
  paymentSum: string;
  period: {
    id: string;
    ratio: number;
    title: string;
  };
  pickupBranch?: {
    address: string;
    id: string;
    phone: string;
    title: string;
  };
  product: {
    id: string;
    maxDriversCount: number;
    title: string;
  };
  selectedPartner: {
    files: [];
    id: string;
    logoUrl: string;
    name: string;
  };
  startDate: null;
  status: string;
  title: string;
};

export type ISelectParams = {
  id: string;
  ratio: number;
  title: string;
};

export type ICarType = {
  id: string;
  paramTitle: string;
  selectParams: ISelectParams[];
  title: string;
};

export type IDelivery = {
  id: string;
  isDelivery: boolean;
  price: string;
  title: string;
};

export type IInsuranceType = {
  id: string;
  title: string;
};

export type IOffices = {
  address: string;
  id: string;
  phone: string;
  title: string;
};

export type IPeriodList = {
  id: string;
  ratio: number;
  title: string;
};

export type IProduct = {
  basePrice: string;
  id: string;
  maxDriversCount: number;
  title: string;
};

export type INewApplication = {
  carTypesList: ICarType[];
  delivery: IDelivery[];
  insuranceType: IInsuranceType[];
  offices: IOffices[];
  periodList: IPeriodList[];
  productsList: IProduct[];
  urls: string[];
};

export type ITotal = {
  bankPercent: string;
  baseSum: string;
  calcList: {
    description: string;
    param: number;
    title: string;
  }[];
  deliveryPrice: string;
  nsp: string;
  totalSum: string;
};

export const getLocationsList = () => {
  return axios
    .post('https://crm.citypay.kg/api/', {
      TYPE: 'get_locations_list',
      API_KEY: '28HimH4QhcEd4muqSktp',
    })
    .then(
      (response: {
        data: {
          data: ILocationsList | null;
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

export const getApplicationsList = (phone: string) => {
  return axios
    .post('https://crm.citypay.kg/api/', {
      TYPE: 'get_applications_list',
      API_KEY: '28HimH4QhcEd4muqSktp',
      CLIENT_PHONE: phone,
    })
    .then(
      (response: {
        data: {
          data: IApplication[];
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

export const getDataFromPartnerForNewApplication = (partnerId: string) => {
  return axios
    .post('https://crm.citypay.kg/api/', {
      TYPE: 'get_data_from_partner_for_new_application',
      API_KEY: '28HimH4QhcEd4muqSktp',
      PARTNER_ID: partnerId,
    })
    .then(
      (response: {
        data: {
          data: INewApplication;
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

export const getTotalSum = ({
  partnerId,
  isHasToCard,
  isKgRegistrations,
  productId,
  selectedPeriodId,
}: {
  partnerId: string;
  isHasToCard: boolean;
  isKgRegistrations: boolean;
  productId: string;
  selectedPeriodId: string;
}) => {
  return axios
    .post('https://crm.citypay.kg/api/', {
      TYPE: 'get_total_sum',
      API_KEY: '28HimH4QhcEd4muqSktp',
      PARTNER_ID: partnerId,
      IS_HAS_TO_CARD: isHasToCard,
      IS_KG_REGISTRATION: isKgRegistrations,
      PRODUCT_ID: productId,
      SELECTED_PERIOD_ID: selectedPeriodId,
    })
    .then(
      (response: {
        data: {
          data: ITotal;
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

export type ICreateNewApplicationParams = {
  phone: string;
  contactPhone: string;
  insuranceTypeId: string;
  selectedPartnerId: string;
  isOwner: boolean;
  isHasToCard: boolean;
  isKgRegistration: boolean;
  selectedProductId: string;
  selectedPeriodId: string;
  carTypeId: string;
  email: string;
  carTypeParamId: string;
  carNumber: string;
  carVendor: string;
  carModel: string;
  carYear: string;
  carVin: string;
  deliveryId: boolean;
  isPickup: boolean;
  deliveryAddress: string;
  pickupOfficeId: string;
  images: string[];
  driver1firstname: string;
  driver1Lastname: string;
  driver1surname: string;
  driver1birthday: string;
  driver1pin: string;
  driver1driverLicenseDate: string;
  driver1class: string;
  driver2firstname?: string;
  driver2Lastname?: string;
  driver2surname?: string;
  driver2birthday?: string;
  driver2pin?: string;
  driver2driverLicenseDate?: string;
  driver2class?: string;
  driver3firstname?: string;
  driver3Lastname?: string;
  driver3surname?: string;
  driver3birthday?: string;
  driver3pin?: string;
  driver3driverLicenseDate?: string;
  driver3class?: string;
  driver4firstname?: string;
  driver4Lastname?: string;
  driver4surname?: string;
  driver4birthday?: string;
  driver4pin?: string;
  driver4driverLicenseDate?: string;
  driver4class?: string;
};

export const createNewApplication = ({
  phone,
  insuranceTypeId,
  selectedPartnerId,
  isOwner,
  isHasToCard,
  isKgRegistration,
  selectedProductId,
  selectedPeriodId,
  contactPhone,
  email,
  carTypeId,
  carTypeParamId,
  carNumber,
  carVendor,
  carModel,
  carYear,
  carVin,
  deliveryId,
  deliveryAddress,
  isPickup,
  pickupOfficeId,
  images,
  driver1firstname,
  driver1Lastname,
  driver1surname,
  driver1birthday,
  driver1pin,
  driver1driverLicenseDate,
  driver1class,
  driver2firstname,
  driver2Lastname,
  driver2surname,
  driver2birthday,
  driver2pin,
  driver2driverLicenseDate,
  driver2class,
  driver3firstname,
  driver3Lastname,
  driver3surname,
  driver3birthday,
  driver3pin,
  driver3driverLicenseDate,
  driver3class,
  driver4firstname,
  driver4Lastname,
  driver4surname,
  driver4birthday,
  driver4pin,
  driver4driverLicenseDate,
  driver4class,
}: ICreateNewApplicationParams) => {
  return axios
    .post('https://crm.citypay.kg/api/', {
      TYPE: 'create_new_application',
      API_KEY: '28HimH4QhcEd4muqSktp',
      CLIENT_PHONE: phone,
      INSURANCE_TYPE_ID: insuranceTypeId,
      SELECTED_PARTNER_ID: selectedPartnerId,
      IS_OWNER: isOwner,
      IS_HAS_TO_CARD: isHasToCard,
      IS_KG_REGISTRATION: isKgRegistration,
      SELECTED_PRODUCT_ID: selectedProductId,
      SELECTED_PERIOD_ID: selectedPeriodId,
      CONTACT_PHONE: contactPhone,
      CONTACT_EMAIL: email,
      CAR_TYPE_ID: carTypeId,
      CAR_TYPE_PARAM_ID: carTypeParamId,
      CAR_NUMBER: carNumber,
      CAR_VENDOR: carVendor,
      CAR_MODEL: carModel,
      CAR_YEAR: carYear,
      CAR_VIN: carVin,
      DELIVERY_ID: deliveryId,
      DELIVERY_ADDRESS: deliveryAddress,
      IS_PICKUP: isPickup,
      PICKUP_OFFICE_ID: pickupOfficeId,
      IMAGES: images,
      DRIVER_1_FIRSTNAME: driver1firstname,
      DRIVER_1_LASTNAME: driver1Lastname,
      DRIVER_1_SURNAME: driver1surname,
      DRIVER_1_BIRTHDAY: driver1birthday,
      DRIVER_1_PIN: driver1pin,
      DRIVER_1_DRIVER_LICENSE_DATE: driver1driverLicenseDate,
      DRIVER_1_CLASS: driver1class,
      DRIVER_2_FIRSTNAME: driver2firstname,
      DRIVER_2_LASTNAME: driver2Lastname,
      DRIVER_2_SURNAME: driver2surname,
      DRIVER_2_BIRTHDAY: driver2birthday,
      DRIVER_2_PIN: driver2pin,
      DRIVER_2_DRIVER_LICENSE_DATE: driver2driverLicenseDate,
      DRIVER_2_CLASS: driver2class,
      DRIVER_3_FIRSTNAME: driver3firstname,
      DRIVER_3_LASTNAME: driver3Lastname,
      DRIVER_3_SURNAME: driver3surname,
      DRIVER_3_BIRTHDAY: driver3birthday,
      DRIVER_3_PIN: driver3pin,
      DRIVER_3_DRIVER_LICENSE_DATE: driver3driverLicenseDate,
      DRIVER_3_CLASS: driver3class,
      DRIVER_4_FIRSTNAME: driver4firstname,
      DRIVER_4_LASTNAME: driver4Lastname,
      DRIVER_4_SURNAME: driver4surname,
      DRIVER_4_BIRTHDAY: driver4birthday,
      DRIVER_4_PIN: driver4pin,
      DRIVER_4_DRIVER_LICENSE_DATE: driver4driverLicenseDate,
      DRIVER_4_CLASS: driver4class,
    })
    .then(
      (response: {
        data: {
          data: any;
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

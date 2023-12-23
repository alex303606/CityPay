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
}: {
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
}) => {
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

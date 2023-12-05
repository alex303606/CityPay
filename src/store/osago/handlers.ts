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
  driver1Bithday: string;
  driver1Class: string;
  driver1DriveLicenseDate: null;
  driver1Firstname: string;
  driver1Lastname: string;
  driver1Pin: string;
  driver1Surname: string;
  endDate: null;
  id: string;
  insurancePolicyNumber: null;
  insurancePolicyUrl: [];
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
  pickupBranch: {
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

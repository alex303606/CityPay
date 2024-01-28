import axios from 'axios';
import {ILanguages} from '../profile';
import {
  DriverPhotos,
  ICarDocuments,
  IDriver,
  MyDataState,
} from '../../screens/Osago/types';
import RNFetchBlob from 'rn-fetch-blob';

// const URL = 'https://orig.citypay.kg/api/';
const URL = 'https://crm.citypay.kg/api/';

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
  paymentReceiptNumber: string | null;
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

export const getLocationsList = (lang: ILanguages) => {
  return axios
    .post(URL, {
      TYPE: 'get_locations_list',
      API_KEY: '28HimH4QhcEd4muqSktp',
      LANG: lang,
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

export const getApplicationsList = (phone: string, lang: ILanguages) => {
  return axios
    .post(URL, {
      TYPE: 'get_applications_list',
      API_KEY: '28HimH4QhcEd4muqSktp',
      CLIENT_PHONE: phone,
      LANG: lang,
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

export const getDataFromPartnerForNewApplication = (
  partnerId: string,
  lang: ILanguages,
) => {
  return axios
    .post(URL, {
      TYPE: 'get_data_from_partner_for_new_application',
      API_KEY: '28HimH4QhcEd4muqSktp',
      PARTNER_ID: partnerId,
      LANG: lang,
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
  lang,
  carTypeParamId,
  driversState,
  deliveryId,
}: {
  partnerId: string;
  isHasToCard: boolean;
  isKgRegistrations: boolean;
  productId: string;
  selectedPeriodId: string;
  lang: ILanguages;
  carTypeParamId: string;
  deliveryId: string;
  driversState: IDriver[];
}) => {
  const params = {
    TYPE: 'get_total_sum',
    API_KEY: '28HimH4QhcEd4muqSktp',
    PARTNER_ID: partnerId,
    IS_HAS_TO_CARD: isHasToCard,
    IS_KG_REGISTRATION: isKgRegistrations,
    PRODUCT_ID: productId,
    SELECTED_PERIOD_ID: selectedPeriodId,
    LANG: lang,
    CAR_TYPE_PARAM_ID: carTypeParamId,
    DELIVERY_ID: deliveryId,
  };

  driversState.forEach((driver, index) => {
    const currentIndex = index + 1;
    // @ts-ignore
    params[`DRIVER_${currentIndex}_DRIVER_BIRTHDAY`] = driver.date;
    // @ts-ignore
    params[`DRIVER_${currentIndex}_DRIVER_CLASS`] = driver.class;
    // @ts-ignore
    params[`DRIVER_${currentIndex}_DRIVER_LICENSE_DATE`] =
      driver.driverLicenseDate;
  });

  return axios
    .post(URL, params)
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

export const createNewApplicationData = ({
  driversPhotos,
  carPhotos,
  driversState,
  state,
  partner,
}: {
  driversPhotos: DriverPhotos[];
  carPhotos: ICarDocuments;
  driversState: IDriver[];
  state: MyDataState;
  partner: IPartner;
}) => {
  const photosArr = driversPhotos.reduce(
    (acc, photos) => {
      photos.idCard.forEach(image => {
        acc.push({
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      photos.driverLicense.forEach(image => {
        acc.push({
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      return acc;
    },
    [] as {
      uri: string;
      name: string;
      type: string;
    }[],
  );

  carPhotos.registrationCard.forEach(image => {
    photosArr.push({
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
  });

  carPhotos.registration.forEach(image => {
    photosArr.push({
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
  });

  carPhotos.powerOfAttorney.forEach(image => {
    photosArr.push({
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
  });

  const params = [
    {name: 'API_KEY', data: '28HimH4QhcEd4muqSktp'},
    {name: 'TYPE', data: 'create_new_application'},
    {name: 'CLIENT_PHONE', data: state.phone},
    {name: 'INSURANCE_TYPE_ID', data: state.insuranceTypeId},
    {name: 'SELECTED_PARTNER_ID', data: partner.id},
    {name: 'IS_OWNER', data: state.isOwner.toString()},
    {name: 'IS_HAS_TO_CARD', data: state.isHasToCard.toString()},
    {name: 'IS_KG_REGISTRATION', data: state.isKgRegistration.toString()},
    {name: 'SELECTED_PRODUCT_ID', data: state.product},
    {name: 'SELECTED_PERIOD_ID', data: state.selectedPeriodId},
    {name: 'CONTACT_PHONE', data: state.phone},
    {name: 'CONTACT_EMAIL', data: state.email},
    {name: 'CAR_TYPE_ID', data: state.carType},
    {name: 'CAR_TYPE_PARAM_ID', data: state.carTypeParamId},
    {name: 'CAR_NUMBER', data: state.carNumber},
    {name: 'CAR_VENDOR', data: state.carVendor},
    {name: 'CAR_MODEL', data: state.carModel},
    {name: 'CAR_YEAR', data: state.carYear},
    {name: 'CAR_VIN', data: state.carVin},
    {name: 'DELIVERY_ID', data: state.deliveryId},
    {name: 'DELIVERY_ADDRESS', data: state.deliveryAddress},
    {name: 'PICKUP_OFFICE_ID', data: state.pickUpOffice},
  ];

  console.log(params);

  photosArr.forEach((photo, index) => {
    params.push({
      name: `IMAGES[${index}]`,
      // @ts-ignore
      type: 'image.png',
      filename: photo.name,
      data: RNFetchBlob.wrap(photo.uri),
    });
  });

  driversState.forEach((driver, index) => {
    const currentIndex = index + 1;
    params.push({
      name: `DRIVER_${currentIndex}_FIRSTNAME`,
      data: driver.name,
    });
    params.push({
      name: `DRIVER_${currentIndex}_LASTNAME`,
      data: driver.secondName,
    });
    params.push({
      name: `DRIVER_${currentIndex}_SURNAME`,
      data: driver.surname,
    });
    params.push({
      name: `DRIVER_${currentIndex}_BIRTHDAY`,
      data: driver.date,
    });
    params.push({
      name: `DRIVER_${currentIndex}_PIN`,
      data: driver.pin,
    });
    params.push({
      name: `DRIVER_${currentIndex}_CLASS`,
      data: driver.class,
    });
    params.push({
      name: `DRIVER_${currentIndex}_LICENSE_DATE`,
      data: driver.driverLicenseDate,
    });
  });

  return RNFetchBlob.config({
    trusty: true,
  })
    .fetch(
      'POST',
      URL,
      {
        'Content-Type': 'multipart/form-data',
      },
      params,
    )
    .then(response => {
      if (response.data) {
        const data: {
          data: {
            applicationNumber: string;
            id: number;
            paymentSum: string;
          };
          message: string;
          result: boolean;
        } = JSON.parse(response.data);
        return data;
      }
    })
    .catch(error => {
      console.warn(error);
    });
};

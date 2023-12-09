import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IApplication,
  ICarType,
  IDelivery,
  IInsuranceType,
  ILocation,
  ILocationsList,
  INewApplication,
  IOffices,
  IPartner,
  IPeriodList,
  IProduct,
} from './handlers';
import {RootState} from '@store';

export interface IOsagoState {
  partnersList: IPartner[];
  locationsList: ILocation[];
  applicationsList: IApplication[];
  carTypesList: ICarType[];
  delivery: IDelivery[];
  insuranceType: IInsuranceType[];
  offices: IOffices[];
  periodList: IPeriodList[];
  productsList: IProduct[];
  urls: string[];
}

const initialState: IOsagoState = {
  partnersList: [],
  locationsList: [],
  applicationsList: [],
  carTypesList: [],
  delivery: [],
  insuranceType: [],
  offices: [],
  periodList: [],
  productsList: [],
  urls: [],
};

const osagoSlice = createSlice({
  name: 'fines',
  initialState: initialState,
  reducers: {
    setLocationsListSuccess(state, action: PayloadAction<ILocationsList>) {
      state.locationsList = action.payload.locationsList;
      state.partnersList = action.payload.partnersList;
    },
    setApplicationsList(state, action: PayloadAction<IApplication[]>) {
      state.applicationsList = action.payload;
    },
    setNewApplication(state, action: PayloadAction<INewApplication>) {
      state.carTypesList = action.payload.carTypesList;
      state.delivery = action.payload.delivery;
      state.insuranceType = action.payload.insuranceType;
      state.offices = action.payload.offices;
      state.periodList = action.payload.periodList;
      state.productsList = action.payload.productsList;
      state.urls = action.payload.urls;
    },
  },
});

export const osagoReducer = osagoSlice.reducer;
export const getPartnersList = (state: RootState) => state.osago.partnersList;
export const getCarTypesList = (state: RootState) => state.osago.carTypesList;
export const getDeliveryList = (state: RootState) => state.osago.delivery;
export const getInsuranceTypeList = (state: RootState) =>
  state.osago.insuranceType;
export const getOfficesList = (state: RootState) => state.osago.offices;
export const getPeriodList = (state: RootState) => state.osago.periodList;
export const getProductsList = (state: RootState) => state.osago.productsList;
export const getUrlsList = (state: RootState) => state.osago.urls;
export const getLocationsListList = (state: RootState) =>
  state.osago.locationsList;
export const getApplications = (state: RootState) =>
  state.osago.applicationsList;
export const getApplicationById = (id: string) => (state: RootState) =>
  state.osago.applicationsList.find(app => app.id === id);
export const {setLocationsListSuccess, setApplicationsList, setNewApplication} =
  osagoSlice.actions;

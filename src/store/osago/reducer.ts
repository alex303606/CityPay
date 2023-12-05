import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IApplication, ILocation, ILocationsList, IPartner} from './handlers';
import {RootState} from '@store';

export interface IOsagoState {
  partnersList: IPartner[];
  locationsList: ILocation[];
  applicationsList: IApplication[];
}

const initialState: IOsagoState = {
  partnersList: [],
  locationsList: [],
  applicationsList: [],
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
  },
});

export const osagoReducer = osagoSlice.reducer;
export const getPartnersList = (state: RootState) => state.osago.partnersList;
export const getLocationsListList = (state: RootState) =>
  state.osago.locationsList;
export const getApplications = (state: RootState) =>
  state.osago.applicationsList;
export const getApplicationById = (id: string) => (state: RootState) =>
  state.osago.applicationsList.find(app => app.id === id);
export const {setLocationsListSuccess, setApplicationsList} =
  osagoSlice.actions;

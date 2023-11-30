import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ILocation, ILocationsList, IPartner} from './handlers';
import {RootState} from '@store';

export interface IOsagoState {
  partnersList: IPartner[];
  locationsList: ILocation[];
}

const initialState: IOsagoState = {
  partnersList: [],
  locationsList: [],
};

const osagoSlice = createSlice({
  name: 'fines',
  initialState: initialState,
  reducers: {
    getLocationsListSuccess(state, action: PayloadAction<ILocationsList>) {
      state.locationsList = action.payload.locationsList;
      state.partnersList = action.payload.partnersList;
    },
  },
});

export const osagoReducer = osagoSlice.reducer;
export const getPartnersList = (state: RootState) => state.osago.partnersList;
export const getLocationsListList = (state: RootState) =>
  state.osago.locationsList;

export const {getLocationsListSuccess} = osagoSlice.actions;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {IFine} from '@store';

export interface ICarsState {
  fines: IFine[];
}

const initialState: ICarsState = {
  fines: [],
};

const finesSlice = createSlice({
  name: 'fines',
  initialState: initialState,
  reducers: {
    getFinesSuccess(state, action: PayloadAction<{fines: IFine[]}>) {
      state.fines = action.payload.fines;
    },
  },
});

export const finesReducer = finesSlice.reducer;
export const {getFinesSuccess} = finesSlice.actions;
export const getFines = (state: RootState) => state.fines.fines;

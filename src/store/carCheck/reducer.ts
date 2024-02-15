import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';

export type ICarCheckCar = {
  title: string;
  param: string;
};

export type ICarCheckPeriods = {
  dateFrom: string;
  dateTo: string;
};

export interface ICarCheckState {
  car: ICarCheckCar[];
  periods: ICarCheckPeriods[];
  paidVersionAvalible: boolean;
}

const initialState: ICarCheckState = {
  car: [],
  periods: [],
  paidVersionAvalible: false,
};

const carCheckSlice = createSlice({
  name: 'check',
  initialState: initialState,
  reducers: {
    getCarCheckSuccess(
      state,
      action: PayloadAction<{
        car: ICarCheckCar[];
        periods: ICarCheckPeriods[];
        paidVersionAvalible: boolean;
      }>,
    ) {
      state.car = action.payload.car;
      state.periods = action.payload.periods;
      state.paidVersionAvalible = action.payload.paidVersionAvalible;
    },
  },
});

export const carCheckReducer = carCheckSlice.reducer;
export const {getCarCheckSuccess} = carCheckSlice.actions;

export const getCarCheck = (state: RootState) => state.check;

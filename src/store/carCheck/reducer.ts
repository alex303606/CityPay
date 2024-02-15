import {createSlice} from '@reduxjs/toolkit';

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

const carsSlice = createSlice({
  name: 'cars',
  initialState: initialState,
  reducers: {},
});

export const carCheckReducer = carsSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';

export type ICar = {
  number: string;
  inn: string;
};

export interface ICarsState {
  cars: ICar[];
}

const initialState: ICarsState = {
  cars: [],
};

const carsSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    getCarsSuccess(state, action: PayloadAction<{cars: ICar[]}>) {
      state.cars = action.payload.cars;
    },
  },
});

export const carsReducer = carsSlice.reducer;
export const {getCarsSuccess} = carsSlice.actions;
export const getCars = (state: RootState) => state.cars.cars;

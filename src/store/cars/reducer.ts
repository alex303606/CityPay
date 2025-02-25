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
  name: 'cars',
  initialState: initialState,
  reducers: {
    clearCars() {
      return initialState;
    },
    getCarsSuccess(state, action: PayloadAction<{cars: ICar[]}>) {
      state.cars = action.payload.cars;
    },
  },
});

export const carsReducer = carsSlice.reducer;
export const {getCarsSuccess, clearCars} = carsSlice.actions;
export const getCars = (state: RootState) => state.cars.cars;

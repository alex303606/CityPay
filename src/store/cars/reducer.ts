import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    getCarsSuccess(state, action: PayloadAction<ICar[]>) {
      state.cars = action.payload;
    },
  },
});

export const carsReducer = carsSlice.reducer;
export const {getCarsSuccess} = carsSlice.actions;

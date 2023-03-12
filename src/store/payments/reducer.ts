import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';
import {IPayment} from '@store';

export interface IPaymentsState {
  payments: IPayment[];
}

const initialState: IPaymentsState = {
  payments: [],
};

const paymentsSlice = createSlice({
  name: 'fines',
  initialState: initialState,
  reducers: {
    clearPayments() {
      return initialState;
    },
    getPaymentsSuccess(state, action: PayloadAction<{payments: IPayment[]}>) {
      state.payments = action.payload.payments;
    },
  },
});

export const paymentsReducer = paymentsSlice.reducer;
export const getPayments = (state: RootState) => state.payments.payments;
export const {getPaymentsSuccess, clearPayments} = paymentsSlice.actions;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, SettingsResponse} from '@store';

export interface ISettingsState {
  isEwalletPaymentActive: number;
  isPaymentActive: number;
  merchantSystem: number;
  premiumCarsLimit: number;
  standardCarsLimit: number;
}

const initialState: ISettingsState = {
  isEwalletPaymentActive: 0,
  isPaymentActive: 0,
  merchantSystem: 0,
  premiumCarsLimit: 0,
  standardCarsLimit: 0,
};

const settingsSlice = createSlice({
  name: 'cars',
  initialState: initialState,
  reducers: {
    clearSettings() {
      return initialState;
    },
    getSettingsSuccess(state, action: PayloadAction<SettingsResponse>) {
      const {
        isEwalletPaymentActive,
        isPaymentActive,
        merchantSystem,
        premiumCarsLimit,
        standardCarsLimit,
      } = action.payload;

      state.isEwalletPaymentActive = isEwalletPaymentActive;
      state.isPaymentActive = isPaymentActive;
      state.merchantSystem = merchantSystem;
      state.premiumCarsLimit = premiumCarsLimit;
      state.standardCarsLimit = standardCarsLimit;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const {getSettingsSuccess, clearSettings} = settingsSlice.actions;

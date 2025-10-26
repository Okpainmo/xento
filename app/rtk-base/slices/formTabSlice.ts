import { createSlice } from '@reduxjs/toolkit';

interface FormTabState {
  activeTab: 'swap' | 'send' | 'buy' | 'sell';
}

const initialState: FormTabState = {
  activeTab: 'swap', // Default to swap as requested
};

const formTabSlice = createSlice({
  name: 'formTab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    switchToSwap: (state) => {
      state.activeTab = 'swap';
    },
    switchToSend: (state) => {
      state.activeTab = 'send';
    },
    switchToBuy: (state) => {
      state.activeTab = 'buy';
    },
    switchToSell: (state) => {
      state.activeTab = 'sell';
    },
  },
});

export const {
  setActiveTab,
  switchToSwap,
  switchToSend,
  switchToBuy,
  switchToSell,
} = formTabSlice.actions;

export default formTabSlice.reducer;

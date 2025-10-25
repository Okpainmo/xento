import { createSlice } from '@reduxjs/toolkit';

interface FormTabState {
  activeTab: 'swap' | 'send';
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
  },
});

export const { setActiveTab, switchToSwap, switchToSend } =
  formTabSlice.actions;

export default formTabSlice.reducer;

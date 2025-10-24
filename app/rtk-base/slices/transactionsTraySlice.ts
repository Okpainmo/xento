import { createSlice } from '@reduxjs/toolkit';

interface TransactionsTrayState {
  isTraySlidIn: boolean;
  activeView: 'my' | 'all';
  isLoading: boolean;
}

const initialState: TransactionsTrayState = {
  isTraySlidIn: false,
  activeView: 'my',
  isLoading: false,
};

const TransactionsTraySlice = createSlice({
  name: 'transactionTray',
  initialState,
  reducers: {
    slideTrayIn: (state) => {
      state.isTraySlidIn = true;
    },
    slideTrayOut: (state) => {
      state.isTraySlidIn = false;
    },
    setActiveView: (state, action) => {
      state.activeView = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { slideTrayIn, slideTrayOut, setActiveView, setLoading } =
  TransactionsTraySlice.actions;

export default TransactionsTraySlice.reducer;

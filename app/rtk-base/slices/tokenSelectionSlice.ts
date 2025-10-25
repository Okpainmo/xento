import { createSlice } from '@reduxjs/toolkit';
import { Token } from '@/app/custom-data/tokens';

interface TokenSelectionState {
  isPopupOpen: boolean;
  selectedToken: Token | null;
  fromToken: Token | null;
  toToken: Token | null;
  activeSelector: 'from' | 'to' | null;
  availableTokens: Token[];
}

const initialState: TokenSelectionState = {
  isPopupOpen: false,
  selectedToken: null,
  fromToken: null,
  toToken: null,
  activeSelector: null,
  availableTokens: [],
};

const tokenSelectionSlice = createSlice({
  name: 'tokenSelection',
  initialState,
  reducers: {
    openTokenPopup: (state, action) => {
      state.isPopupOpen = true;
      state.activeSelector = action.payload || null;
    },
    closeTokenPopup: (state) => {
      state.isPopupOpen = false;
      state.activeSelector = null;
    },
    toggleTokenPopup: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
    selectToken: (state, action) => {
      state.selectedToken = action.payload;
      if (state.activeSelector === 'from') {
        state.fromToken = action.payload;
      } else if (state.activeSelector === 'to') {
        state.toToken = action.payload;
      }
      state.isPopupOpen = false;
      state.activeSelector = null;
    },
    setAvailableTokens: (state, action) => {
      state.availableTokens = action.payload;
    },
    clearSelectedToken: (state) => {
      state.selectedToken = null;
    },
    setFromToken: (state, action) => {
      state.fromToken = action.payload;
    },
    setToToken: (state, action) => {
      state.toToken = action.payload;
    },
  },
});

export const {
  openTokenPopup,
  closeTokenPopup,
  toggleTokenPopup,
  selectToken,
  setAvailableTokens,
  clearSelectedToken,
  setFromToken,
  setToToken,
} = tokenSelectionSlice.actions;

export default tokenSelectionSlice.reducer;

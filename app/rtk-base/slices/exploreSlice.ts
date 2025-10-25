import { createSlice } from '@reduxjs/toolkit';
import { Token } from '@/app/custom-data/tokens';

interface TokenSelectionState {
  isPopupOpen: boolean;
  // selectedToken: Token | null;
  // fromToken: Token | null;
  // toToken: Token | null;
  // activeSelector: 'from' | 'to' | null;
  availableTokens: Token[];
}

const initialState: TokenSelectionState = {
  isPopupOpen: false,
  // selectedToken: null,
  // fromToken: null,
  // toToken: null,
  // activeSelector: null,
  availableTokens: [],
};

const exploreSlice = createSlice({
  name: 'tokenSelection',
  initialState,
  reducers: {
    openExplorePopup: (state, action) => {
      state.isPopupOpen = true;
      // state.activeSelector = action.payload || null;
    },
    closeExplorePopup: (state) => {
      state.isPopupOpen = false;
      // state.activeSelector = null;
    },
    toggleExplorePopup: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
    // selectToken: (state, action) => {
    //   state.selectedToken = action.payload;
    //   if (state.activeSelector === 'from') {
    //     state.fromToken = action.payload;
    //   } else if (state.activeSelector === 'to') {
    //     state.toToken = action.payload;
    //   }
    //   state.isPopupOpen = false;
    //   state.activeSelector = null;
    // },
    // setAvailableTokens: (state, action) => {
    //   state.availableTokens = action.payload;
    // },
    // clearSelectedToken: (state) => {
    //   state.selectedToken = null;
    // },
    // setFromToken: (state, action) => {
    //   state.fromToken = action.payload;
    // },
    // setToToken: (state, action) => {
    //   state.toToken = action.payload;
    // },
  },
});

export const {
  openExplorePopup,
  closeExplorePopup,
  toggleExplorePopup,
  // selectToken,
  // setAvailableTokens,
  // clearSelectedToken,
  // setFromToken,
  // setToToken,
} = exploreSlice.actions;

export default exploreSlice.reducer;

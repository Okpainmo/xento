import { createSlice } from '@reduxjs/toolkit';

interface OverlayState {
  isOverlayOn: boolean;
}

const initialState: OverlayState = {
  isOverlayOn: false,
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    showOverlay: (state) => {
      state.isOverlayOn = true;
    },
    hideOverlay: (state) => {
      state.isOverlayOn = false;
    },
    toggleOverlay: (state) => {
      state.isOverlayOn = !state.isOverlayOn;
    },
  },
});

export const { showOverlay, hideOverlay, toggleOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;

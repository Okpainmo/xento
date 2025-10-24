import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface NavToggleState {
  isNavSlidIn: boolean;
  isMenuOn: boolean;
}

const initialState: NavToggleState = {
  isNavSlidIn: false,
  isMenuOn: false,
};

const navToggleSlice = createSlice({
  name: 'navToggle',
  initialState,
  reducers: {
    slideNavOut: (state) => {
      state.isNavSlidIn = false;
    },
    slideNavIn: (state) => {
      state.isNavSlidIn = true;
    },
    toggleMenu: (state, action) => {
      if (initialState.isMenuOn == true) {
        state.isMenuOn = false;
      } else {
        state.isMenuOn = !action.payload;
      }
      //   console.log('hello');
    },
    // offMenu: (state) => {
    //   state.isMenuOn = false;
    // }
  },
});

export const { slideNavOut, slideNavIn, toggleMenu } = navToggleSlice.actions;

export default navToggleSlice.reducer;

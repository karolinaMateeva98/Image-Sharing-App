import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AllImagesStateInterface } from '../../interface/redux-state/AllImagesStateInterface';

const initialState: AllImagesStateInterface = {
  images: [],
  isLoading: false,
  isSuccessful: false,
  error: {}
};

export const allImagesSlice = createSlice({
  name: 'allImages',
  initialState,
  reducers: {
    getAllImagesRequestAction: (state: any) => {
      state.isLoading = true;
    },
    getAllImagesSuccessAction: (state: any, action: PayloadAction<[]>) => {
      state.images = action.payload;
      state.isLoading = false;
      state.isSuccessful = true;
    },
    getAllImagesFailedAction: (state: any, action: PayloadAction<{}>) => {
      state.isSuccessful = false;
      state.result = action.payload;
    }
  }
});

export const {
  getAllImagesRequestAction,
  getAllImagesSuccessAction,
  getAllImagesFailedAction
} = allImagesSlice.actions;

export default allImagesSlice.reducer;

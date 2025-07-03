import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CustomMarker } from 'app/Map';

export interface DataPropState {
  selectedMarker: CustomMarker[] | [];
}

const initialState: DataPropState = {
  selectedMarker: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setSelectedMarker: (state, { payload }: PayloadAction<CustomMarker[]>) => {
      state.selectedMarker = payload;
    },
  },
});

export const dataReducer = dataSlice.reducer;
export const { setSelectedMarker } = dataSlice.actions;

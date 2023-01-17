import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = {
  filters: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    updateFilter(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { updateFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

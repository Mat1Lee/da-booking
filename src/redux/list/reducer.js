import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: null,
  getListFailed: null,
  isLoading: false,
  byId: null,
  isGetByIDFailed: null,
  isLoadingByID: false,
};

const userSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    getListRequest: (state) => {
      state.isLoading = true;
    },
    getListSuccess: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.getListiFaled = null;
    },
    getListFailed: (state, action) => {
      state.getListFailed = action.payload;
      state.isLoading = false;
    },
    getListByIdRequest: (state) => {
      state.isLoadingByID = true;

    },
    getListByIdSuccess: (state, action) => {
      state.byId = action.payload;
      state.isLoadingByID = false;
      state.isGetByIDFailed = null;
    },
    getListByIdFailed: (state, action) => {
      state.isGetByIDFailed = action.payload;
      state.isLoadingByID = false;
    },

  },
});

export const listActons = userSlice.actions;

export default userSlice.reducer;

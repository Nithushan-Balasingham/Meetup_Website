import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  loading: false,
  error: false,
  loadingModal: false,
};

const postSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addListStart: (state) => {
      state.loading = true;
    },
    addListSuccess: (state, action) => {
      state.lists.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    addListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getListSuccess: (state, action) => {
      state.collections = action.payload;
      state.loading = false;
      state.error = false;
    },
    getListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addListStart,
  addListSuccess,
  addListFailure,
  getListStart,
  getListSuccess,
  getListFailure,
} =postSlice.actions;
export default postSlice.reducer;

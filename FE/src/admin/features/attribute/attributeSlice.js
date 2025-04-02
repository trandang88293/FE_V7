import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import attributeService from "./attributeService";

// Lấy danh sách thuộc tính
export const getAttributes = createAsyncThunk(
  "attribute/get-attributes",
  async (thunkAPI) => {
    try {
      return await attributeService.getAllAttributes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  attributes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttributes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(getAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attributeSlice.reducer;

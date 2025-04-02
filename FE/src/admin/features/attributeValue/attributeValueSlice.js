import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import attributeService from "./attributeValueService";

// Action: Lấy giá trị của một thuộc tính
export const getAttributeValues = createAsyncThunk(
  "attributes/getAttributeValues",
  async (attributeId, thunkAPI) => {
    try {
        return await attributeService.getAllAttributeValues(attributeId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const attributeValueSlice = createSlice({
  name: "attributeValues",
  initialState: {
    attributeValues: {}, // Object lưu giá trị của từng thuộc tính theo attributeId
    loading: false,
    error: null,
  },
  reducers: {}, // Không cần reducers vì dùng createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Lấy danh sách giá trị thuộc tính
      .addCase(getAttributeValues.pending, (state) => {
        state.loading = true;
      })
    .addCase(getAttributeValues.fulfilled, (state, action) => {
        state.loading = false;
        state.attributeValues[action.meta.arg] = action.payload.data.map((val) => ({
            attributeValueId: val.id,
            attributeValueName: val.name,
        }));
    })    
      .addCase(getAttributeValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attributeValueSlice.reducer;

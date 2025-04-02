import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import {toast} from "react-toastify";
export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);
export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAProduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    try {
      return await productService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductAttribute = createAsyncThunk(
  "product/addProductAttribute",
  async ({ productId, productAttribute }, thunkAPI) => {
    try {
      return await productService.addProductAttribute(productId, productAttribute);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductAttributes = createAsyncThunk(
  "product/getProductAttributes",
  async (productId, thunkAPI) => {
    try {
      return await productService.getProductAttributes(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(createProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createdProduct = action.payload;
        })
        .addCase(createProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getAProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productName = action.payload.title;
            state.productDesc = action.payload.description;
            state.productBrand = action.payload.brand;
            state.productCategory = action.payload.category;
            state.productColor = action.payload.color;
            state.productTags = action.payload.tags;
            state.productPrice = action.payload.price;
            state.productQuantity = action.payload.quantity;
            state.productImages = action.payload.images;
            
        })
        .addCase(getAProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateAProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedProduct = action.payload;
        })
        .addCase(updateAProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteAProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedProduct = action.payload;
            if (state.isSuccess === true) {
              toast.success("🦄 Xóa thành công")
            }
        })
        .addCase(deleteAProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addProductAttribute.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addProductAttribute.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // Có thể cập nhật product detail nếu cần
        })
        .addCase(addProductAttribute.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getProductAttributes.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProductAttributes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.productAttributes = action.payload.data; // Lưu danh sách biến thể vào state
        })
        .addCase(getProductAttributes.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(resetState, () => initialState)
    },
});
export default productSlice.reducer;
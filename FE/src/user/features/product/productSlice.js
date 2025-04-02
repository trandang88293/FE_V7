import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { productService } from './productService';
import {toast} from "react-toastify";

export const getAllProducts = createAsyncThunk(
    "products/get", 
    async (data, thunkAPI) => {
        try{
            return await productService.getProducts(data);
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const getAProduct = createAsyncThunk(
    "product/get", 
    async (id, thunkAPI) => {
        try{
            return await productService.getProduct(id);
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const addToWishlist = createAsyncThunk(
    "product/wishlist/add", 
    async (prodId, thunkAPI) => {
        try{
            return await productService.addToWishlist(prodId);
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const rateProduct = createAsyncThunk(
    "product/rating", 
    async (data, thunkAPI) => {
        try{
            return await productService.rateProduct(data);
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)


const initialState = {
    products: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
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
                state.product = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;    
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishlist = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Thêm vào wishlist thành công!")
                }
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;    
            })
            .addCase(rateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Thêm đánh giá thành công!")
                }
            })
            .addCase(rateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;    
            })
    }
})

export default productSlice.reducer;
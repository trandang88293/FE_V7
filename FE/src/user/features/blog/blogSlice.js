import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { blogService } from './blogService';
import {toast} from "react-toastify";

export const getAllBlogs = createAsyncThunk(
    "blogs/get", 
    async (thunkAPI) => {
        try{
            return await blogService.getBlogs();
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const getABlog = createAsyncThunk(
    "blog/get", 
    async (id, thunkAPI) => {
        try{
            return await blogService.getBlog(id);
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;    
            })
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blog = action.payload;
            })
            .addCase(getABlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;    
            })
    }
})

export default blogSlice.reducer;
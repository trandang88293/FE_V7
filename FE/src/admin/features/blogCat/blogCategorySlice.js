import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";
import {toast} from "react-toastify";
export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBlogCategory = createAsyncThunk(
  "blogCategory/create-category",
  async (blogCatData, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategory(blogCatData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCat = createAsyncThunk(
  "blogCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABlogCat = createAsyncThunk(
  "blogCategory/update-category",
  async (blogCat, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogCategory(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlogCategory = createAsyncThunk(
  "blogCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCategories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlogCategory = action.payload;
        })
        .addCase(createBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getABlogCat.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getABlogCat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCatName = action.payload.title;
        })
        .addCase(getABlogCat.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateABlogCat.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateABlogCat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlogCategory = action.payload;
        })
        .addCase(updateABlogCat.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteABlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlogCategory = action.payload;
            if (state.isSuccess === true) {
              toast.success("🦄 Xóa thành công")
            }
        })
        .addCase(deleteABlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});
export default blogCategorySlice.reducer;

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import {toast} from "react-toastify";
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrderById = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMonthlyData = createAsyncThunk(
  "orders/monthlydata",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getYearlyData = createAsyncThunk(
  "orders/yearlydata",
  async (thunkAPI) => {
    try {
      return await authService.getYearlyStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/update-orderstatus",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          state.isLoading = false;
        })
        //get order admin
        .addCase(getOrders.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          state.isLoading = false;
        })
        .addCase(getOrderById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getOrderById.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.orderbyid = action.payload;
        })
        .addCase(getOrderById.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          state.isLoading = false;
        })
        .addCase(updateOrderStatus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedOrder = action.payload;
          if (state.isSuccess === true) {
            toast.success("🦄 Cập nhật trạng thái đơn hàng thành công")
          }
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getMonthlyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getMonthlyData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.monthlyData = action.payload;
        })
        .addCase(getMonthlyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getYearlyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getYearlyData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.yearlyData = action.payload;
        })
        .addCase(getYearlyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;
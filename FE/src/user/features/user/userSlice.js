import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { authService } from './userService';
import {toast} from "react-toastify";
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const registerUser = createAsyncThunk(
    "auth/register", 
    async (userData, thunkAPI) => {
        try{
            return await authService.register(userData)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/login", 
    async (userData, thunkAPI) => {
        try{
            return await authService.login(userData)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const updateAUser = createAsyncThunk(
    "auth/profile/update", 
    async (data, thunkAPI) => {
        try{
            return await authService.updateUser(data)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const forgotPassToken = createAsyncThunk(
    "auth/password/token", 
    async (data, thunkAPI) => {
        try{
            return await authService.forgotPassToken(data)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const resetPass = createAsyncThunk(
    "auth/password/reset", 
    async (data, thunkAPI) => {
        try{
            return await authService.resetPass(data)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async (thunkAPI) => {
        try{
            return await authService.getUserWishlist()
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const addProductToCart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkAPI) => {
        try{
            return await authService.addToCart(cartData)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async ( thunkAPI) => {
        try{
            return await authService.getCart()
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async (cartItemId, thunkAPI) => {
        try{
            return await authService.removeCart(cartItemId)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const emptyCart = createAsyncThunk(
    "user/cart/delete",
    async ( thunkAPI) => {
        try{
            return await authService.emptyCart()
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const updateQuantityProductCart = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetail, thunkAPI) => {
        try{
            return await authService.updateCartQuantity(cartDetail)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const createOrder = createAsyncThunk(
    "user/cart/create-order",
    async (orderDetail, thunkAPI) => {
        try{
            return await authService.createOrder(orderDetail)
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const getUserOrders = createAsyncThunk(
    "user/order/get",
    async (orderDetail, thunkAPI) => {
        try{
            return await authService.getMyOrders()
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const resetState = createAction("Reset_all");
const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Tạo tài khoản thành công!")
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem("token", action.payload.token)
                    toast.success("🦄 Đăng nhập thành công!")
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(updateAUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Cập nhật thông tin thành công!")
                }
            })
            .addCase(updateAUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error("🦄 Thông tin sai hoặc đã được sử dụng!")
                }
            })
            .addCase(forgotPassToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Xác nhận thành công! Mở email của bạn và xác nhận!")
                }
            })
            .addCase(forgotPassToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error("🦄 Email không tồn tại trên hệ thống!")
                }
            })
            .addCase(resetPass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.password = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Reset mật khẩu thành công! Vui lòng đăng nhập lại!")
                }
            })
            .addCase(resetPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Thêm vào giỏ hàng thành công!")
                }
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.carts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteCart = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Xóa khỏi giỏ hàng thành công!")
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(emptyCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(emptyCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.emptyCart = action.payload;
            })
            .addCase(emptyCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateQuantityProductCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQuantityProductCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updateCart = action.payload;
            })
            .addCase(updateQuantityProductCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Đặt hàng thành công!")
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                
            })
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                
            })

            .addCase(resetState, () => initialState);
    }
})

export default authSlice.reducer;
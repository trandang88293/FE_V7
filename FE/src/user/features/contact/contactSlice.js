import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { contactService } from './contactService';
import {toast} from "react-toastify";

export const createQuery = createAsyncThunk(
    "contact/post", 
    async (contactData, thunkAPI) => {
        try{
            return await contactService.postQuery(contactData);
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)


export const resetState = createAction("Reset_all");
const initialState = {
    contact: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contact = action.payload;
                if (state.isSuccess === true) {
                    toast.success("🦄 Gửi thành công thành công!")
                }
            })
            .addCase(createQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;   
            })

            .addCase(resetState, () => initialState);
    }
})

export default contactSlice.reducer;
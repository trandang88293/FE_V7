import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import customerReducer from "../features/customer/customerSlice"
import productReducer from "../features/product/productSlice"
import brandReducer from "../features/brand/brandSlice"
import categoryReducer from "../features/category/categorySlice"
import blogCategoryReducer from "../features/blogCat/blogCategorySlice"
import blogReducer from "../features/blog/blogSlice"
import colorReducer from "../features/color/colorSlice"
import enquiryReducer from "../features/enquiry/enquirySlice"
import uploadReducer from "../features/upload/uploadSlice"
import couponReducer from "../features/coupon/couponSlice"
export const store = configureStore({
    reducer: {
      auth: authReducer,
      customer: customerReducer,
      product: productReducer,
      brand: brandReducer,
      category: categoryReducer,
      blogCategory: blogCategoryReducer,
      blog: blogReducer,
      color: colorReducer,
      enquiry: enquiryReducer,
      upload: uploadReducer,
      coupon: couponReducer,
    },
}); 
export default store;

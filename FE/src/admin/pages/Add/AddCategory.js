import React, { useEffect } from 'react'
import CustomInput from '../../components/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup";
import { useFormik } from "formik"
import {
  createCategory,
  getACategory,
  resetState,
  updateACategory,
} from "../../features/category/categorySlice"
let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên thương hiệu"),
});
const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory} = newCategory
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("🦄 Thêm thành công!")
    }
    if (isSuccess && updatedCategory) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại")
    }
  }, [isSuccess, isError, isLoading])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, pCatData: values };
        dispatch(updateACategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });
  return (
    <div>
        <h3 className='mb-4'>
        {getCategoryId !== undefined ? "Sửa" : "Thêm"} thương hiệu
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                  id="category" 
                  type='text' 
                  label='Nhập tên danh mục'
                  name="title"
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  value={formik.values.title}
                />
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
              <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getCategoryId !== undefined ? "Sửa" : "Thêm"} danh mục
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory
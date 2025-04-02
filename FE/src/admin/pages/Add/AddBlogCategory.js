import React, {useEffect} from 'react'
import CustomInput from '../../components/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBlogCategory,
  getABlogCat,
  resetState,
  updateABlogCat,
} from "../../features/blogCat/blogCategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCategory)
  const {isSuccess, isError, isLoading, createdBlogCategory, blogCatName, updatedBlogCategory} = newBlogCategory
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("🦄 Thêm thành công!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
        <h3 className='mb-4'>
          {getBlogCatId !== undefined ? "Sửa" : "Thêm"} danh mục blog
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput 
                id="blogcat" 
                type='text' 
                label='Nhập tên danh mục blog'
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div className="error">
                  {formik.touched.title && formik.errors.title}
              </div>
              <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getBlogCatId !== undefined ? "Sửa" : "Thêm"} danh mục blog
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCategory
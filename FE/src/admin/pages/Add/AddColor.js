import React, {useEffect} from 'react'
import CustomInput from '../../components/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập màu"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess, 
    isError, 
    isLoading, 
    createdColor, 
    colorName, 
    updatedColor
  } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("🦄 Thêm thành công!");
    }
    if (isSuccess && updatedColor) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
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
          {getColorId !== undefined ? "Sửa" : "Thêm"} màu sắc
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput 
                id="color" 
                type='text' 
                label='Nhập tên màu sắc'
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div className="error">
                {formik.touched.title && formik.errors.title}
              </div>
              <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getColorId !== undefined ? "Sửa" : "Thêm"} màu sắc
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor

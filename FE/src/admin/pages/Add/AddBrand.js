import React, {useEffect} from 'react'
import CustomInput from '../../components/CustomInput'
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên thương hiệu"),
});
const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const getBrandId = location.pathname.split("/")[3]
  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isError, isLoading, createdBrand, updatedBrand, brandName  } = newBrand
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId)); //nếu lấy dc ID thì sẽ lấy thông tin của cái id đó ra
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("🦄 Thêm thành công!");
    } 
    if (isSuccess && updatedBrand) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) { 
        const data = { id: getBrandId, brandData: values }; // lấy id và data moi truyền vào database
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values))
        formik.resetForm()
        setTimeout(() => {
          // dispatch(resetState())
        }, 1000);
      }
    },
  });
  return (
    <div>
        <h3 className='mb-4'>
          {getBrandId !== undefined ? "Sửa" : "Thêm"} thương hiệu
        </h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                id="brand" 
                type='text' 
                label='Nhập tên thương hiệu'
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div className="error">
                {formik.touched.title && formik.errors.title}
              </div>
              <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {getBrandId !== undefined ? "Sửa" : "Thêm"} thương hiệu
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand
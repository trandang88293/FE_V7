import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../../features/coupon/couponSlice";

let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên coupon"),
  expiry: yup.date().required("Vui lòng nhập ngày hết hạn"),
  discount: yup.number().required("Vui lòng nhập % giảm giá"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess, 
    isError, 
    isLoading, 
    createdCoupon, 
    couponName,
    couponDiscount,
    couponExpiry, 
    updatedCoupon
  } = newCoupon;
  console.log(createdCoupon)
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("🦄 Thêm thành công!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            label="Nhập tên Coupon"
            id="title"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            label="Nhập ngày hết hạn"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            value={formik.values.discount}
            label="Nhập % giảm giá"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
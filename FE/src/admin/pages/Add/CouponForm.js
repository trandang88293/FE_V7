import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const CouponForm = () => {
  const [coupon, setCoupon] = useState({
    code: "",
    discountPercentage: 0,
    maxDiscount: 0,
    minOrderValue: 0,
    startDate: "",
    endDate: "",
    quantity: 0,
  });

  // State để lưu lỗi validate cho từng trường
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/coupons/${id}`)
        .then((res) => res.json())
        .then((data) => setCoupon(data))
        .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  // Hàm validate kiểm tra các trường dữ liệu
  const validate = () => {
    const tempErrors = {};

    // discountPercentage phải nằm trong khoảng từ 1 đến 100
    if (
      !coupon.discountPercentage ||
      coupon.discountPercentage < 1 ||
      coupon.discountPercentage > 100
    ) {
      tempErrors.discountPercentage =
        "Phần trăm giảm giá phải nằm trong khoảng từ 1 đến 100";
    }
    // maxDiscount > 0
    if (!coupon.maxDiscount || coupon.maxDiscount <= 0) {
      tempErrors.maxDiscount = "Giảm giá tối đa phải lớn hơn 0";
    }
    // minOrderValue > 0
    if (!coupon.minOrderValue || coupon.minOrderValue <= 0) {
      tempErrors.minOrderValue =
        "Giá trị đơn hàng tối thiểu phải lớn hơn 0";
    }
    // startDate và endDate phải được nhập, và endDate phải sau startDate
    if (!coupon.startDate) {
      tempErrors.startDate = "Vui lòng nhập ngày bắt đầu";
    }
    if (!coupon.endDate) {
      tempErrors.endDate = "Vui lòng nhập ngày kết thúc";
    }
    if (coupon.startDate && coupon.endDate) {
      const start = new Date(coupon.startDate);
      const end = new Date(coupon.endDate);
      if (start >= end) {
        tempErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
      }
    }
    // quantity > 0
    if (!coupon.quantity || coupon.quantity <= 0) {
      tempErrors.quantity = "Số lượng phải lớn hơn 0";
    }

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validate();
    setErrors(tempErrors);

    // Nếu có lỗi thì không submit
    if (Object.keys(tempErrors).length > 0) {
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8080/api/coupons/${id}`
      : `http://localhost:8080/api/coupons`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coupon),
    })
      .then(() => navigate("/admin/coupons"))
      .catch((err) => console.error("Lỗi khi gửi dữ liệu:", err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            {id ? "Chỉnh sửa Coupon" : "Thêm Coupon"}
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Mã Coupon */}
            <div className="mb-3">
              <label className="form-label">Mã Coupon:</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={coupon.code}
                onChange={handleChange}
                placeholder="Để trống nếu muốn sinh mã tự động"
              />
            </div>
            {/* Phần trăm giảm giá */}
            <div className="mb-3">
              <label className="form-label">Phần trăm giảm giá:</label>
              <input
                type="number"
                className="form-control"
                name="discountPercentage"
                value={coupon.discountPercentage}
                onChange={handleChange}
                required
              />
              {errors.discountPercentage && (
                <div className="text-danger">
                  {errors.discountPercentage}
                </div>
              )}
            </div>
            {/* Giảm giá tối đa - sử dụng NumericFormat */}
            <div className="mb-3">
              <label className="form-label">Giảm giá tối đa:</label>
              <NumericFormat
                className="form-control"
                name="maxDiscount"
                thousandSeparator="."
                decimalSeparator=","
                placeholder="Nhập giá trị giảm tối đa"
                value={coupon.maxDiscount}
                onValueChange={(values) =>
                  setCoupon({
                    ...coupon,
                    maxDiscount: values.value,
                  })
                }
              />
              {errors.maxDiscount && (
                <div className="text-danger">{errors.maxDiscount}</div>
              )}
            </div>
            {/* Giá trị đơn hàng tối thiểu - sử dụng NumericFormat */}
            <div className="mb-3">
              <label className="form-label">
                Giá trị đơn hàng tối thiểu:
              </label>
              <NumericFormat
                className="form-control"
                name="minOrderValue"
                thousandSeparator="."
                decimalSeparator=","
                placeholder="Nhập giá trị đơn hàng tối thiểu"
                value={coupon.minOrderValue}
                onValueChange={(values) =>
                  setCoupon({
                    ...coupon,
                    minOrderValue: values.value,
                  })
                }
              />
              {errors.minOrderValue && (
                <div className="text-danger">
                  {errors.minOrderValue}
                </div>
              )}
            </div>
            {/* Ngày bắt đầu */}
            <div className="mb-3">
              <label className="form-label">Ngày bắt đầu:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="startDate"
                value={coupon.startDate}
                onChange={handleChange}
                required
              />
              {errors.startDate && (
                <div className="text-danger">{errors.startDate}</div>
              )}
            </div>
            {/* Ngày kết thúc */}
            <div className="mb-3">
              <label className="form-label">Ngày kết thúc:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="endDate"
                value={coupon.endDate}
                onChange={handleChange}
                required
              />
              {errors.endDate && (
                <div className="text-danger">{errors.endDate}</div>
              )}
            </div>
            {/* Số lượng */}
            <div className="mb-3">
              <label className="form-label">Số lượng:</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={coupon.quantity}
                onChange={handleChange}
                required
              />
              {errors.quantity && (
                <div className="text-danger">{errors.quantity}</div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                {id ? "Cập nhật" : "Thêm mới"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/coupons")}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CouponForm;

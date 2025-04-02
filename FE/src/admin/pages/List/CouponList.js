import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8080/api/coupons";

// Formatter chuyển đổi sang định dạng tiền tệ VND
const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  // Sử dụng react-hook-form cho form chỉnh sửa coupon
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCoupons();
  }, [page, keyword]);

  // Khi chuyển sang chỉnh sửa, reset form với dữ liệu của coupon được chọn
  useEffect(() => {
    if (editingId) {
      const coupon = coupons.find((c) => c.couponId === editingId);
      if (coupon) {
        // Nếu dữ liệu kiểu LocalDateTime, chuyển về định dạng phù hợp với input datetime-local
        reset({
          code: coupon.code || "",
          discountPercentage: coupon.discountPercentage || "",
          maxDiscount: coupon.maxDiscount || "",
          minOrderValue: coupon.minOrderValue || "",
          startDate: coupon.startDate ? coupon.startDate.substring(0, 16) : "",
          endDate: coupon.endDate ? coupon.endDate.substring(0, 16) : "",
          quantity: coupon.quantity || "",
        });
      }
    } else {
      reset({
        code: "",
        discountPercentage: "",
        maxDiscount: "",
        minOrderValue: "",
        startDate: "",
        endDate: "",
        quantity: "",
      });
    }
  }, [editingId, coupons, reset]);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(
        `${API_URL}?keyword=${keyword}&page=${page}&size=${pageSize}`
      );
      const data = await response.json();
      setCoupons(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách coupon:", error);
    }
  };

  const onSubmit = async (formData) => {
    // Nếu code không được nhập, để backend tự sinh (backend sẽ kiểm tra)
    if (!formData.code || formData.code.trim() === "") {
      formData.code = "";
    }
    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditingId(null);
    }
    fetchCoupons();
    reset();
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon.couponId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa coupon này?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchCoupons();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchCoupons();
  };

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`btn btn-sm mx-1 ${page === i ? "btn-primary" : "btn-secondary"}`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Coupon</h2>

      {/* Phần tìm kiếm */}
      <form className="mb-3" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo mã coupon..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Tìm kiếm
          </button>
        </div>
      </form>

      {editingId ? (
        <div>
          <h3 className="mb-3">Chỉnh sửa Coupon</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Mã Coupon (để trống sẽ tự tạo)"
                {...register("code", {
                  pattern: {
                    value: /^[A-Z0-9]*$/,
                    message: "Mã coupon chỉ được chứa chữ in hoa và số",
                  },
                })}
              />
              {errors.code && <p className="text-danger">{errors.code.message}</p>}
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="number"
                placeholder="% Giảm giá"
                {...register("discountPercentage", {
                  required: "Vui lòng nhập % giảm giá",
                  min: { value: 1, message: "% Giảm giá phải ≥ 1" },
                  max: { value: 100, message: "% Giảm giá không được > 100" },
                })}
              />
              {errors.discountPercentage && (
                <p className="text-danger">{errors.discountPercentage.message}</p>
              )}
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="number"
                placeholder="Giá trị giảm tối đa"
                step="0.01"
                {...register("maxDiscount", {
                  required: "Vui lòng nhập giá trị giảm tối đa",
                  min: { value: 0.01, message: "Giá trị giảm tối đa phải > 0" },
                })}
              />
              {errors.maxDiscount && <p className="text-danger">{errors.maxDiscount.message}</p>}
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="number"
                placeholder="Đơn hàng tối thiểu"
                step="0.01"
                {...register("minOrderValue", {
                  required: "Vui lòng nhập đơn hàng tối thiểu",
                  min: { value: 0.01, message: "Đơn hàng tối thiểu phải > 0" },
                })}
              />
              {errors.minOrderValue && (
                <p className="text-danger">{errors.minOrderValue.message}</p>
              )}
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="datetime-local"
                {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
              />
              {errors.startDate && <p className="text-danger">{errors.startDate.message}</p>}
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="datetime-local"
                {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
              />
              {errors.endDate && <p className="text-danger">{errors.endDate.message}</p>}
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="number"
                placeholder="Số lượng"
                {...register("quantity", {
                  required: "Vui lòng nhập số lượng coupon",
                  min: { value: 1, message: "Số lượng phải ≥ 1" },
                })}
              />
              {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Cập nhật
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditingId(null)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Mã Coupon</th>
                <th>% Giảm giá</th>
                <th>Giảm tối đa</th>
                <th>Đơn hàng tối thiểu</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.couponId}>
                  <td>{c.code}</td>
                  <td>{c.discountPercentage}%</td>
                  <td>{vndFormatter.format(c.maxDiscount)}</td>
                  <td>{vndFormatter.format(c.minOrderValue)}</td>
                  <td>{c.startDate}</td>
                  <td>{c.endDate}</td>
                  <td>{c.quantity}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(c)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(c.couponId)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center align-items-center my-3">
            <button
              className="btn btn-secondary btn-sm mx-1"
              onClick={() => page > 0 && setPage(page - 1)}
              disabled={page === 0}
            >
              Prev
            </button>
            {renderPageNumbers()}
            <button
              className="btn btn-secondary btn-sm mx-1"
              onClick={() => page < totalPages - 1 && setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

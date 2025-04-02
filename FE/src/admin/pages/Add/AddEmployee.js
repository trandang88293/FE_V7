import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // State lưu preview của ảnh
  const [avatarPreview, setAvatarPreview] = useState("");

  // Hàm xử lý preview ảnh khi chọn file
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview("");
    }
  };

  // Khi form submit, tạo FormData với các trường yêu cầu
  const onSubmit = async (data) => {
    const formData = new FormData();
    // Đảm bảo gửi đầy đủ các trường: name, username, password, email, phone, role, isActive
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("isActive", data.isActive);
    // Nếu có file avatar, thêm file vào FormData
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Nhân viên đã được thêm thành công!");
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi tạo nhân viên:", error);
      // Nếu backend trả về lỗi liên quan đến trùng lặp, set lỗi cho input tương ứng
      const errMsg = error.response?.data || "Có lỗi xảy ra khi tạo nhân viên.";
      if (errMsg.includes("Username")) {
        setError("username", { message: errMsg, type: "server" });
      }
      if (errMsg.includes("Email")) {
        setError("email", { message: errMsg, type: "server" });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Thêm Nhân Viên</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Họ Tên</label>
          <input
            type="text"
            className="form-control"
            {...register("name", {
              required: "Họ tên không được để trống",
              pattern: {
                value: /^[a-zA-ZÀ-ỹ\s]+$/,
                message: "Họ tên không được chứa số và kí tự đặc biệt",
              },
            })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tên Đăng Nhập</label>
          <input
            type="text"
            className="form-control"
            {...register("username", {
              required: "Tên đăng nhập không được để trống",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Tên đăng nhập không được chứa kí tự đặc biệt",
              },
            })}
          />
          {errors.username && <p className="text-danger">{errors.username.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mật Khẩu</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Mật khẩu không được để trống" })}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Số Điện Thoại</label>
          <input
            type="text"
            className="form-control"
            {...register("phone", {
              required: "Số điện thoại không được để trống",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
          />
          {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Vai Trò</label>
          <select className="form-select" {...register("role", { required: true })} defaultValue={1}>
            <option value={3}>Nhân viên</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Chọn Ảnh Đại Diện</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            {...register("avatar")}
            onChange={handleAvatarChange}
          />
          {avatarPreview && (
            <img src={avatarPreview} alt="Avatar Preview" className="mt-2" width="100" />
          )}
        </div>

        {/* isActive được gửi dưới dạng hidden */}
        <input type="hidden" value={true} {...register("isActive")} />
        <button type="submit" className="btn btn-primary w-100">
          Thêm Nhân Viên
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

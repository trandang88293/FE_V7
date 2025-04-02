import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const Customer = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State cho tìm kiếm và phân trang
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  // Khởi tạo react-hook-form, bao gồm setError để set lỗi từ backend
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchAccounts();
  }, [page, keyword]);

  // Khi chuyển sang chế độ sửa, reset form với dữ liệu hiện tại
  useEffect(() => {
    if (editingAccount) {
      reset(editingAccount);
    }
  }, [editingAccount, reset]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts", {
        params: { keyword, page, size: pageSize },
      });
      setAccounts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài khoản:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // reset trang khi tìm kiếm mới
    fetchAccounts();
  };

  const handleEdit = (account) => {
    setEditingAccount({ ...account, password: "" }); // reset password khi sửa
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingAccount(null);
    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    // Chuẩn bị FormData để gửi, bao gồm file nếu có
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("isActive", data.isActive);
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      await axios.put(
        `http://localhost:8080/api/accounts/${editingAccount.accountId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchAccounts();
      setIsEditing(false);
      setEditingAccount(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
      // Nếu backend trả về lỗi trùng lặp cho username hoặc email, set lỗi cho input tương ứng
      const errMsg = error.response?.data;
      if (errMsg) {
        if (errMsg.includes("Username")) {
          setError("username", { message: errMsg, type: "server" });
        }
        if (errMsg.includes("Email")) {
          setError("email", { message: errMsg, type: "server" });
        }
      } else {
        alert("Có lỗi xảy ra khi cập nhật tài khoản.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/accounts/${id}`);
      fetchAccounts();
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
    }
  };

  const handleDisable = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/accounts/${id}/disable`);
      fetchAccounts();
    } catch (error) {
      console.error("Lỗi khi vô hiệu hóa tài khoản:", error);
    }
  };

  // Tạo mảng các nút trang từ 0 đến totalPages-1
  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`btn btn-sm ${page === i ? "btn-primary" : "btn-secondary"} mx-1`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quản lý khách hàng</h2>

      {/* Phần tìm kiếm */}
      <form className="mb-3" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên hoặc username..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Tìm kiếm
          </button>
        </div>
      </form>

      {/* Hiển thị danh sách khi không ở chế độ sửa */}
      {!isEditing && (
        <>
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Tên</th>
                <th>Username</th>
                <th>Mật khẩu</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accountId}>
                  <td>{account.accountId}</td>
                  <td>
                    {account.avatar && (
                      <img
                        src={account.avatar}
                        alt="Avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                      />
                    )}
                  </td>
                  <td>{account.name}</td>
                  <td>{account.username}</td>
                  <td>******</td>
                  <td>{account.email}</td>
                  <td>{account.phone}</td>
                  <td>
                    {account.role === 1
                      ? "Khách hàng"
                      : account.role === 2
                      ? "Admin"
                      : "Nhân viên"}
                  </td>
                  <td>
                  <span className={`badge ${account.active ? "bg-success" : "bg-danger"}`}>
  {account.active ? "Hoạt động" : "Vô hiệu hóa"}
</span>

</td>

                  <td>
                    <button onClick={() => handleEdit(account)} className="btn btn-primary btn-sm mx-1">
                      Sửa
                    </button>
                    <button onClick={() => handleDisable(account.accountId)} className="btn btn-warning btn-sm mx-1">
                      Vô hiệu hóa
                    </button>
                    <button onClick={() => handleDelete(account.accountId)} className="btn btn-danger btn-sm">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Điều hướng phân trang */}
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

      {/* Form sửa tài khoản sử dụng react-hook-form */}
      {isEditing && editingAccount && (
        <div className="mt-4">
          <h3>Sửa tài khoản</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name", {
                  required: "Tên không được để trống",
                  pattern: {
                    value: /^[a-zA-ZÀ-ỹ\s]+$/,
                    message: "Tên không được chứa số và kí tự đặc biệt",
                  },
                })}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                {...register("username", {
                  required: "Username không được để trống",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Username không được chứa kí tự đặc biệt",
                  },
                })}
              />
              {errors.username && <p className="text-danger">{errors.username.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", { required: "Mật khẩu không được để trống" })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
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
              <label htmlFor="phone" className="form-label">
                SĐT
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
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
              <label htmlFor="role" className="form-label">
                Vai trò
              </label>
              <select className="form-control" id="role" {...register("role")}>
                <option value={1}>User</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="isActive" className="form-label">
                Trạng thái
              </label>
              <select className="form-control" id="isActive" {...register("isActive")}>
                <option value={true}>Hoạt động</option>
                <option value={false}>Vô hiệu hóa</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="avatar" className="form-label">
                Avatar
              </label>
              <input type="file" className="form-control" id="avatar" {...register("avatar")} />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Cập nhật
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
              Hủy
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customer;

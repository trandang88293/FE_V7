import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy thông tin tài khoản đã đăng nhập từ localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : '';

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/account/change-password', {
        username,
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (response.data.success) {
        setSuccess('Đổi mật khẩu thành công!');
      } else {
        setError(response.data.message || 'Đổi mật khẩu thất bại!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label className="form-label">Mật khẩu hiện tại</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nhập lại mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

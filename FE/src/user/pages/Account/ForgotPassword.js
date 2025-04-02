import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Bước 1: Gửi yêu cầu quên mật khẩu
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/forgot-password', { usernameOrEmail: username });
      setMessage(response.data.message);
      // Giả sử API trả về resetCode trong response.data.data (chỉ dùng cho demo)
      if (response.data.data) {
        localStorage.setItem('resetCode', response.data.data);
        localStorage.setItem('username', username);
      }
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  // Bước 2: Xác nhận reset code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    const storedCode = localStorage.getItem('resetCode');
    if (storedCode && storedCode === resetCode) {
      setMessage("Mã xác nhận hợp lệ, vui lòng đặt lại mật khẩu!");
      setStep(3);
    } else {
      setMessage("Mã xác nhận không chính xác hoặc đã hết hạn!");
    }
  };

  // Bước 3: Đặt lại mật khẩu
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới không khớp!");
      return;
    }

    try {
      const payload = {
        usernameOrEmail: localStorage.getItem('username'), // Lấy từ Local Storage
        resetCode: localStorage.getItem('resetCode'),
        newPassword,
      };

      const response = await axios.post('http://localhost:8080/auth/reset-password', payload);
      setMessage(response.data.message);

      // Xóa thông tin khỏi Local Storage sau khi đặt lại mật khẩu thành công
      localStorage.removeItem('resetCode');
      localStorage.removeItem('username');
    } catch (error) {
      setMessage(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
};

  return (
    <div>
      <h2>Quên mật khẩu</h2>
      {message && <p>{message}</p>}

      {step === 1 && (
        <form onSubmit={handleForgotPassword}>
          <div>
            <label htmlFor="username">Username hoặc Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit">Gửi mã xác nhận</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <div>
            <label htmlFor="resetCode">Mã xác nhận</label>
            <input
              type="text"
              id="resetCode"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Xác nhận mã</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="newPassword">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đổi mật khẩu</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;

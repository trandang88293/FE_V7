import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Hàm lấy danh sách voucher
  const fetchVouchers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/coupons', {
        params: { keyword, page, size }
      });
      setVouchers(response.data.content);
    } catch (error) {
      console.error("Lỗi khi tải voucher:", error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [keyword, page]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">🎉 Danh sách Voucher 🎉</h2>

      {/* Tìm kiếm */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Tìm voucher theo mã..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setPage(0)}>Tìm kiếm</button>
      </div>

      {/* Hiển thị danh sách voucher */}
      <div className="row">
        {vouchers && vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <div className="col-md-4 mb-3" key={voucher.id}>
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body text-center">
                  <h5 className="card-title text-uppercase fw-bold text-danger">
                    <i className="bi bi-ticket-detailed"></i> {voucher.code}
                  </h5>
             
                  <p className="card-text text-success fw-bold">
                    🎁 Giảm giá: {voucher.discountPercentage}%
                  </p>
                  <p className="card-text">
                    📅 <strong>Bắt đầu:</strong> {voucher.startDate || 'Không xác định'}
                  </p>
                  <p className="card-text">
                    ⏳ <strong>Kết thúc:</strong> {voucher.endDate || 'Không xác định'}
                  </p>
                  <p className="card-text">
                    🔢 <strong>Số lượng:</strong> {voucher.quantity || 0}
                  </p>
                  <p className="card-text">
                    ✅ <strong>Điều kiện: đơn hàng tối thiểu</strong> {voucher.minOrderValue  || 'Không có điều kiện'} VND 
                  </p>
                  <button className="btn btn-danger btn-sm mt-2">
                    🎟 Sử dụng Voucher
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">😔 Không có voucher nào</p>
        )}
      </div>
    </div>
  );
};

export default VoucherList;

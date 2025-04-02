import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [thirdPartyField, setThirdPartyField] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  let username = null;
  if (userString) {
    try {
      const user = JSON.parse(userString);
      username = user.username;
    } catch (error) {
      console.error("Lỗi parse user từ localStorage", error);
    }
  }

  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=3')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => console.error("Lỗi khi lấy danh sách tỉnh:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find(p => p.code.toString() === selectedProvince);
      setDistricts(province ? province.districts : []);
      setSelectedDistrict('');
      setWards([]);
      setSelectedWard('');
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.code.toString() === selectedDistrict);
      setWards(district ? district.wards : []);
      setSelectedWard('');
    }
  }, [selectedDistrict, districts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    const addressObj = {
      recipientName,
      phoneNumber,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      wardId: selectedWard,
      thirdPartyField,
    };

    axios
      .post(`http://localhost:8080/address/add?username=${username}`, addressObj)
      .then(response => {
        if (response.data.status) {
          alert("Thêm địa chỉ thành công");
          navigate('/myaddress');
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error("Lỗi thêm địa chỉ:", error);
        alert("Lỗi khi thêm địa chỉ");
      });
  };

  return (
    <div className="container mt-4">
      <h3>Thêm Địa Chỉ</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên người nhận</label>
          <input type="text" className="form-control" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Tỉnh/Thành phố</label>
          <select className="form-select" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} required>
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map(province => (
              <option key={province.code} value={province.code}>{province.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Quận/Huyện</label>
          <select className="form-select" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} required>
            <option value="">Chọn quận/huyện</option>
            {districts.map(district => (
              <option key={district.code} value={district.code}>{district.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Phường/Xã</label>
          <select className="form-select" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} required>
            <option value="">Chọn phường/xã</option>
            {wards.map(ward => (
              <option key={ward.code} value={ward.code}>{ward.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Thông tin thêm</label>
          <input type="text" className="form-control" value={thirdPartyField} onChange={(e) => setThirdPartyField(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Thêm địa chỉ</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/myaddress')}>Hủy</button>
      </form>
    </div>
  );
};

export default AddAddress;

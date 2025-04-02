import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  
  // State cho form
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [thirdPartyField, setThirdPartyField] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  
  const [editMode, setEditMode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);  // State điều khiển hiển thị form
  const [showList, setShowList] = useState(true);   // State điều khiển hiển thị danh sách

  // Lấy thông tin user từ localStorage
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

  // Hàm lấy danh sách địa chỉ của tài khoản
  const fetchAddresses = () => {
    if (!username) return;
    axios
      .get(`http://localhost:8080/address/get?username=${username}`)
      .then(response => {
        if (response.data.status) {
          setAddresses(response.data.data);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => console.error("Lỗi khi lấy địa chỉ:", error));
  };

  useEffect(() => {
    if (username) fetchAddresses();
  }, [username]);

  // Lấy danh sách các tỉnh/thành phố kèm theo quận huyện và phường xã
  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=3')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => console.error("Lỗi khi lấy danh sách tỉnh:", error));
  }, []);

  // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành phố
  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find(p => p.code.toString() === selectedProvince);
      if (province && province.districts) {
        setDistricts(province.districts);
      } else {
        setDistricts([]);
      }
    } else {
      setDistricts([]);
    }
    setSelectedDistrict('');
    setWards([]);
    setSelectedWard('');
  }, [selectedProvince, provinces]);

  // Cập nhật danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.code.toString() === selectedDistrict);
      if (district && district.wards) {
        setWards(district.wards);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
    setSelectedWard('');
  }, [selectedDistrict, districts]);

  // Các hàm mapping: chuyển mã số sang tên
  const getProvinceName = (code) => {
    const province = provinces.find(p => p.code.toString() === code);
    return province ? province.name : code;
  };

  const getDistrictName = (provinceCode, districtCode) => {
    const province = provinces.find(p => p.code.toString() === provinceCode);
    if (province && province.districts) {
      const district = province.districts.find(d => d.code.toString() === districtCode);
      return district ? district.name : districtCode;
    }
    return districtCode;
  };

  const getWardName = (provinceCode, districtCode, wardCode) => {
    const province = provinces.find(p => p.code.toString() === provinceCode);
    if (province && province.districts) {
      const district = province.districts.find(d => d.code.toString() === districtCode);
      if (district && district.wards) {
        const ward = district.wards.find(w => w.code.toString() === wardCode);
        return ward ? ward.name : wardCode;
      }
    }
    return wardCode;
  };

  // Xử lý submit form (thêm mới hoặc cập nhật)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    // Xây dựng đối tượng địa chỉ
    const addressObj = {
      recipientName,
      phoneNumber,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      wardId: selectedWard,
      thirdPartyField,
    };

    if (editMode) {
      // Cập nhật địa chỉ
      addressObj.addressId = editingAddressId;
      axios
        .put(`http://localhost:8080/address/update?username=${username}`, addressObj)
        .then(response => {
          if (response.data.status) {
            alert("Cập nhật địa chỉ thành công");
            fetchAddresses();
            resetForm();
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error("Lỗi cập nhật địa chỉ:", error);
          alert("Lỗi khi cập nhật địa chỉ");
        });
    } else {
      // Thêm địa chỉ
      axios
        .post(`http://localhost:8080/address/add?username=${username}`, addressObj)
        .then(response => {
          if (response.data.status) {
            alert("Thêm địa chỉ thành công");
            fetchAddresses();
            resetForm();
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error("Lỗi khi thêm địa chỉ:", error);
          alert("Lỗi khi thêm địa chỉ");
        });
    }
  };

  // Reset form sau khi thêm hoặc cập nhật
  const resetForm = () => {
    setRecipientName('');
    setPhoneNumber('');
    setThirdPartyField('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setEditMode(false);
    setEditingAddressId(null);
    setShowForm(false);  // Hide form after reset
    setShowList(true);   // Hiển thị lại danh sách sau khi hoàn tất
  };

  // Xử lý khi nhấn nút "Sửa": load dữ liệu của địa chỉ vào form
  const handleEdit = (address) => {
    setEditMode(true);
    setEditingAddressId(address.addressId);
    setRecipientName(address.recipientName);
    setPhoneNumber(address.phoneNumber);
    setThirdPartyField(address.thirdPartyField);
    setSelectedProvince(address.provinceId);
    setSelectedDistrict(address.districtId);
    setSelectedWard(address.wardId);
    setShowForm(true);   // Show form when editing
    setShowList(false);  // Hide the address list when editing

    // Cập nhật lại danh sách quận, phường theo tỉnh/quận được chọn
    const province = provinces.find(p => p.code.toString() === address.provinceId);
    if (province && province.districts) {
      setDistricts(province.districts);
    }
    const district = province && province.districts
      ? province.districts.find(d => d.code.toString() === address.districtId)
      : null;
    if (district && district.wards) {
      setWards(district.wards);
    }
  };

  // Xử lý xóa địa chỉ
  const handleDelete = (addressId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
      axios
        .delete(`http://localhost:8080/address/delete?username=${username}&addressId=${addressId}`)
        .then(response => {
          if (response.data.status) {
            alert("Xóa địa chỉ thành công");
            fetchAddresses();
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error("Lỗi xóa địa chỉ:", error);
          alert("Lỗi khi xóa địa chỉ");
        });
    }
  };

  return (
    <div className="container mt-4">

      {/* Tiêu đề & nút Thêm địa chỉ mới */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Địa chỉ của tôi</h3>
        <button
          className="btn btn-danger"
          onClick={() => {
            setShowForm(true);
            setShowList(false);
            resetForm(); // Đảm bảo form sạch trước khi thêm mới
          }}
        >
          <a href='/my-profile/addaddress'> + Thêm địa chỉ mới
          </a>
        </button>
      </div>

      {/* Danh sách địa chỉ - chỉ hiển thị khi `showList` = true */}
      {showList && (
        <>
          <h5>Địa chỉ</h5>
          {/* Hiển thị theo dạng danh sách thay vì bảng */}
          {addresses && addresses.length > 0 ? (
            addresses.map(addr => (
              <div
                key={addr.addressId}
                className="border rounded p-3 mb-3 d-flex justify-content-between align-items-start"
                style={{ backgroundColor: '#fff' }}
              >
                {/* Thông tin địa chỉ */}
                <div>
                  <div className="fw-bold" style={{ fontSize: '1.4rem' }}>
                    {addr.recipientName} <span className="text-muted">({addr.phoneNumber})</span>
                  </div>
                  {/* Hiển thị địa chỉ dạng gộp: ward, district, province */}
                  <div style={{ fontSize: '1rem' }}>
                    {getWardName(addr.provinceId, addr.districtId, addr.wardId)},&nbsp;
                    {getDistrictName(addr.provinceId, addr.districtId)},&nbsp;
                    {getProvinceName(addr.provinceId)}
                  </div>
                  {/* Thông tin thêm (thirdPartyField) */}
                  {addr.thirdPartyField && (
                    <div style={{ fontSize: '1rem' }}>{addr.thirdPartyField}</div>
                  )}
                </div>

                {/* Các nút hành động */}
                <div>
                  <button
                    className="btn btn-link p-0 me-3"
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleEdit(addr)}
                  >
                    Cập nhật
                  </button>
                  <button
                    className="btn btn-link p-0 text-danger"
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleDelete(addr.addressId)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-3">
              <em>Chưa có địa chỉ nào</em>
            </div>
          )}
        </>
      )}

      {/* Form thêm/cập nhật địa chỉ - chỉ hiển thị khi `showForm` = true */}
      {showForm && (
        <div className="border rounded p-4" style={{ backgroundColor: '#fff' }}>
          <h5>{editMode ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên người nhận</label>
              <input
                type="text"
                className="form-control"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tỉnh/Thành phố</label>
              <select
                className="form-select"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                required
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map(province => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Quận/Huyện</label>
              <select
                className="form-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map(district => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Phường/Xã</label>
              <select
                className="form-select"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                required
              >
                <option value="">Chọn phường/xã</option>
                {wards.map(ward => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Thông tin thêm</label>
              <input
                type="text"
                className="form-control"
                value={thirdPartyField}
                onChange={(e) => setThirdPartyField(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">
              {editMode ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
            </button>
            {editMode && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Hủy
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressManager;

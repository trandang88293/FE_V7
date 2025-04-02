import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Button, ListGroup, Form, Row, Col } from 'react-bootstrap';

const Profile = () => {
  // Lấy dữ liệu người dùng từ localStorage (đã lưu khi đăng nhập)
  const [profile, setProfile] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }
    const userObj = JSON.parse(storedUser);
    // Giả sử localStorage lưu đầy đủ các trường cần thiết
    setProfile({
      username: userObj.username,
      name: userObj.name || '',
      email: userObj.email || '',
      phone: userObj.phone || '',
      gender: userObj.gender || '',
      birthDate: userObj.birthDate || '',
      avatar: userObj.avatar || 'https://via.placeholder.com/120' // Avatar mặc định nếu chưa có
    });
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Khi nhấn nút Lưu thông tin cá nhân
  const handleSave = async () => {
    if (!profile.name.trim()) {
      return alert('Tên không được để trống!');
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/account/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.status) {
        // Cập nhật lại localStorage nếu cần
        localStorage.setItem('user', JSON.stringify(profile));
        alert('Cập nhật thông tin thành công!');
      } else {
        alert(data.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi chọn file avatar
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8080/account/update-avatar', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.status) {
        setProfile((prev) => ({ ...prev, avatar: data.data }));
        localStorage.setItem('user', JSON.stringify({ ...profile, avatar: data.data }));
      } else {
        alert(data.message || 'Cập nhật ảnh thất bại');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi tải ảnh lên');
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '1500px' }}>
      <Card className="p-4">
        {/* Tiêu đề trang hồ sơ */}
        <h4 className="mb-0">Hồ Sơ Của Tôi</h4>
        <small className="text-muted mb-4">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </small>

        <hr />

        {/* Bố cục 2 cột: Thông tin bên trái, avatar bên phải */}
        <Row>
          {/* Cột bên trái: Thông tin người dùng */}
          <Col md={8}>
            <ListGroup variant="flush" className="mb-3">
              {/* Tên đăng nhập (chỉ hiển thị) */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col sm={4} className="fw-bold">Tên đăng nhập</Col>
                  <Col sm={8}>{profile.username}</Col>
                </Row>
              </ListGroup.Item>

              {/* Tên */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col sm={4} className="fw-bold">Tên</Col>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Email */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col sm={4} className="fw-bold">Email</Col>
                  <Col sm={8}>
                    <Form.Control
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Số điện thoại */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col sm={4} className="fw-bold">Số điện thoại</Col>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Giới tính */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col sm={4} className="fw-bold">Giới tính</Col>
                  <Col sm={8}>
                    <Form.Check
                      inline
                      label="Nam"
                      name="gender"
                      type="radio"
                      id="genderNam"
                      checked={profile.gender === 0 || profile.gender === '0'}
                      onChange={() => handleChange('gender', 0)}
                    />
                    <Form.Check
                      inline
                      label="Nữ"
                      name="gender"
                      type="radio"
                      id="genderNu"
                      checked={profile.gender === 1 || profile.gender === '1'}
                      onChange={() => handleChange('gender', 1)}
                    />
                    <Form.Check
                      inline
                      label="Khác"
                      name="gender"
                      type="radio"
                      id="genderKhac"
                      checked={profile.gender === 2 || profile.gender === '2'}
                      onChange={() => handleChange('gender', 2)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Ngày sinh */}
              <ListGroup.Item className="py-3">
                <Row>
                  <Col sm={4} className="fw-bold">Ngày sinh</Col>
                  <Col sm={8}>
                    <Form.Control
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {/* Nút Lưu */}
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </Col>

          {/* Cột bên phải: Avatar */}
          <Col md={4} className="text-center">
            <div>
              <img
                src={profile.avatar}
                alt="Avatar"
                className="rounded-circle border border-secondary"
                style={{ width: '120px', height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={handleAvatarClick}
              />
              <div className="mt-2">
                <Button variant="outline-secondary" onClick={handleAvatarClick}>
                  Chọn Ảnh
                </Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <div className="mt-2 text-muted" style={{ fontSize: '0.85rem' }}>
                Dung lượng file tối đa 1 MB<br />
                Định dạng: JPEG, PNG
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;

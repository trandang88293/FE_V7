import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead'; // thanh search
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/product/productSlice';
import { Dropdown } from 'react-bootstrap'; // Sử dụng Dropdown từ React-Bootstrap

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.carts);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [totalAmount, setTotalAmount] = useState(null);
  const [user, setUser] = useState(null); // Lưu thông tin người dùng từ localStorage

  useEffect(() => { 
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + (Number(cartState[i].quantity) * cartState[i].price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < productState?.length; i++) {
      const element = productState[i];
      data.push({id: i, prod: element?._id, name: element?.title});
    }
    setProductOpt(data);
  }, [productState]);

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Cập nhật thông tin người dùng vào state
    }
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Tải lại trang để cập nhật lại giao diện
  };

  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0'>
                Store uy tín, giá tốt nhất thị trường
              </p>
            </div>
            <div className='col-6'>
              <p className='text-end text-white mb-0'>
                Hotline: <a className='text-white' href ="tel:+83 0909963300">+84 818823871</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h2>
                <Link to='/' className='text-white'>hihi</Link>
              </h2>
            </div>
            <div className='col-5'>
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  labelKey={"name"}
                  options={productOpt}
                  paginate={paginate}
                  placeholder="Nhập tên sản phẩm..."
                  minLength={2}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div className="header-upper-link"></div>
                <div>
                  <Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                    <img src ="/images/compare.svg" alt="compare" />
                    <p className='mb-0'>
                      So sánh <br /> sản phẩm
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                    <img src ="/images/wishlist.svg" alt="wishlist" />
                    <p className='mb-0'>
                      Danh sách <br /> yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center gap-10 text-white">
                      <img src="/images/user.svg" alt="user" />
                      {user ? (
                        <p className='mb-0'>
                          {user?.username} {/* Hiển thị tên người dùng */}
                        </p>
                      ) : (
                        <p className='mb-0'>
                          Đăng nhập <br /> tài khoản
                        </p>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu">
                      {user && (
                        <>
                          <Dropdown.Item as={Link} to="/my-profile">Thông tin cá nhân</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/reset-password">Đổi mật khẩu</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/forgot-password">Quên mật khẩu</Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                        </>
                      )}
                      {!user && (
                        <Dropdown.Item as={Link} to="/login">Đăng nhập</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div>
                  <Link to='cart' className='d-flex align-items-center gap-10 text-white'>
                    <img src ="/images/cart.svg" alt="cart" />
                    <div className='d-flex flex-column gap-10'>
                      <span className='badge bg-white text-dark'>{cartState?.length ? cartState.length : 0}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row '>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div>
                  <div class="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="/images/menu.svg" alt="menu icon" />
                      <span className="me-5 d-inline-block">Danh mục sản phẩm</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="">Điện thoại</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Máy tính bản</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Phụ kiện</Link></li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to= "/">Trang chủ</NavLink>
                    <NavLink to= "/product">Sản phẩm</NavLink>
                    <NavLink to= "/blog">Blog công nghệ</NavLink>
                    <NavLink to= "/contact">Liên hệ</NavLink>
                    {
                      authState?.user !== null ? (
                        <NavLink to= "/my-order">Đơn hàng của tôi</NavLink>
                      ) : null
                    }
                    {
                      authState?.user !== null ? (
                        <button 
                          onClick={handleLogout}
                          className='border border-0 bg-transparent text-white' 
                          type='button'
                        >
                        </button>
                      ) : null
                    }
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

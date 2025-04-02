import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUnorderedList, AiOutlineFileSearch } from 'react-icons/ai';
import { SiProducthunt } from 'react-icons/si';
import { RiBillLine, RiNotification2Line } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { Button, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='fs-5 text-center py-4 mb-0'>
            <span className='lg-logo'>SEVEN SHOP</span>
            <span className='sm-logo'>SEVEN SEVEN</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              // Xử lý đăng xuất
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />, 
              label: 'Bảng điều khiển',
            },
            {
              key: 'nhanvien',
              icon: <AiOutlineUser className='fs-4' />, 
              label: 'Nhân viên',
              children: [
                {
                  key: 'employee',
                  label: 'Danh sách nhân viên',
                },
                {
                  key: 'addemployee',
                  label: 'Thêm nhân viên',
                },
              ],
            },
            {
              key: 'khachhang',
              icon: <AiOutlineUser className='fs-4' />, 
              label: 'Khách hàng',
              children: [
                {
                  key: 'customers',
                  label: 'Danh sách khách hàng',
                },
                {
                  key: 'AddAccount',
                  label: 'Thêm khách hàng',
                },
              ],
            },

            {
              key: 'coupon',
              icon: <AiOutlineUser className='fs-4' />, 
              label: 'Khuyến mãi',
              children: [
                {
                  key: 'coupons',
                  label: 'Danh sách khuyến mãimãi',
                },
                {
                  key: 'coupons/create',
                  label: 'Thêm khuyến mãi',
                },
              ],
            },
            {
              key: 'catalog',
              icon: <AiOutlineUnorderedList className='fs-4' />, 
              label: 'Danh mục',
              children: [
                {
                  key: 'product',
                  icon: <SiProducthunt className='fs-4' />, 
                  label: 'Thêm sản phẩm',
                },
                {
                  key: 'product-list',
                  icon: <SiProducthunt className='fs-4' />, 
                  label: 'Danh sách sản phẩm',
                },
         
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-4' />, 
                  label: 'Danh sách danh mục',
                },
              ],
            },
            {
              key: 'orders',
              icon: <RiBillLine className='fs-4' />, 
              label: 'Đơn hàng',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className='d-flex justify-content-between ps-1 pe-5' style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold className='fs-4' /> : <AiOutlineMenuFold className='fs-4' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className='position-relative'>
              <RiNotification2Line className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center dropdown'>
              <div>
                <img width={32} height={32} src='avatar.jpg' alt='' />
              </div>
              <div role='button' id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>Đông Ngô 69</h5>
                <p className='mb-0'>69conheocon@gmail.com</p>
              </div>
              <div className='dropdown-menu p-0' aria-labelledby='dropdownMenuLink'>
                <li><Link className="dropdown-item py-1 mb-1" to="/">Thông tin người dùng</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" to="/">Đăng xuất</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer }}>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
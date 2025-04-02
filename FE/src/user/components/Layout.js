import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = () => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith('/my-profile');

  return (
    <>
      <Header />
      <Container fluid className="p-0" style={{ backgroundColor: '#f5f5f5' }}>
        <Row className="g-0">
          {showSidebar && (
            <Col 
              xs={2} 
              className="p-0" 
              style={{ position: 'relative', zIndex: 1000 }}
            >
              <Sidebar />
            </Col>
          )}

          <Col
            xs={showSidebar ? 10 : 12}
            style={{
              paddingTop: '60px', // Khoảng cách cho Header
              transition: 'margin-left 0.3s ease-in-out',
              backgroundColor: '#f5f5f5'
            }}
          >
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Layout;

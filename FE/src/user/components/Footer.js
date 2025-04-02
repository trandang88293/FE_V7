import React from 'react'
import {Link} from 'react-router-dom'
import {
  BsGithub,
  BsTwitter,
  BsYoutube,
  BsFacebook,
} from 'react-icons/bs'
const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-5'>
              <div className='footer-top-data d-flex gap-30 align-items-center'>
                <img src="/images/newsletter.png" alt="newsletter"/>
                <h2 className='mb-0 text-white'>Kết nối với chúng tôi</h2>
              </div>
            </div>
            <div className='col-7'>
              <div className="input-group">
                <input type="text" 
                  className="form-control py-1" 
                  placeholder="Nhập email để đăng ký" 
                  aria-label="Nhập email để đăng ký" 
                  aria-describedby="basic-addon2"/>
                <span className="input-group-text p-2" id="basic-addon2">
                  Đăng ký ngay
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'>Thông tin liên hệ</h4>
              <div className='footer-link d-flex flex-column'>
                <address className='text-white fs-6'>
                  Đ/C: 1135 Huỳnh Tấn Phát, <br />
                  p.Phú Thuận, Q.7, Tp.Hồ Chí Minh <br />
                  PinCode: 696969
                </address>
                <a href="tel:+84 0909963300" className='mt-2 d-block mb-1 text-white'>+84 090996xxxx</a>
                <a href="mailto:69conheocon@gmail.com" className='mt-3 d-block mb-2 text-white'>nqdstore@gmail.com</a>
              </div>
              <div className='social_icons d-flex align-items-center gap-30 mt-4'>
                <a className='text-white' href='https://github.com/DongNgo69'>
                  <BsGithub className='fs-4' />
                </a>
                <a className='text-white' href='https://twitter.com/ngoquangdong2'>
                  <BsTwitter className='fs-4' />
                </a>
                <a className='text-white' href='https://www.youtube.com/@dongngo69'>
                  <BsYoutube className='fs-4' />
                </a>
                <a className='text-white' href='https://www.facebook.com/dongngo4501/'>
                  <BsFacebook className='fs-4'/>
                </a>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Chính sách</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1' to= '/privacy-policy'>Chính sách bảo mật</Link>
                <Link className='text-white py-2 mb-1' to= '/refund-policy'>Chính sách đổi trả</Link>
                <Link className='text-white py-2 mb-1' to= '/warranty-policy'>Chính sách bảo hành</Link>
                <Link className='text-white py-2 mb-1' to= '/shipping-policy'>Chính sách giao hàng</Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Hỗ trợ khách hàng</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1' to= '/about'>Về NQD Store</Link>
                <Link className='text-white py-2 mb-1' to= '/'>Câu hỏi thường gặp</Link>
                <Link className='text-white py-2 mb-1' to= '/contact'>Liên hệ</Link>
                <Link className='text-white py-2 mb-1' to= '/blog'>Blog công nghệ</Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Dịch vụ</h4>
              <div className='footer-link d-flex flex-column'>
                <Link className='text-white py-2 mb-1' to= '/'>Điện thoại</Link>
                <Link className='text-white py-2 mb-1' to= '/'>Máy tính bảng</Link>
                <Link className='text-white py-2 mb-1' to= '/'>Smartwatch</Link>
                <Link className='text-white py-2 mb-1' to= '/'>Phụ kiện</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <p className='text-center mb-0 text-white'>
                &copy; {new Date().getFullYear()}; Powered by DongNgo69
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
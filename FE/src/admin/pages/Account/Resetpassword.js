import React from 'react'
import CustomInput from '../../components/CustomInput'
import {Link} from 'react-router-dom'
const Resetpassword = () => {
  return (
    <div className='py-5' style={{background: '#ffd333', minHeight:'100vh'}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'>Đặt lại mất khẩu</h3>
          <p className='text-center'>Nhập lại mật khẩu mới của bạn.</p>
          <form action=''>
            <CustomInput type='password' label='Mật khẩu mới' id='password' />
            <CustomInput type='password' label='Xác nhận lại mật khẩu' id='confirmpassword' />
            <Link 
              className='border-0 px-3 py-2 fw-bold w-100 text-black text-center text-decoration-none fs-5' 
              style={{background: '#ffd333'}}
              type='submit'>
                Xác nhận
              </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Resetpassword
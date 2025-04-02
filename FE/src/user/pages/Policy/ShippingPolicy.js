import React from 'react'
import BreadCrumb from '../../components/Restore/BreadCrumb';
import Meta from '../../components/Restore/Meta';
const ShippingPolicy = () => {
  return (
    <>
        <Meta title={'Chính sách giao hàng'} />
        <BreadCrumb title='Shipping-Policy' />
        <div className='policy-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <p>Chính sách giao hàng của chúng tôi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShippingPolicy
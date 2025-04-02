import React from 'react'
import BreadCrumb from '../../components/Restore/BreadCrumb';
import Meta from '../../components/Restore/Meta';

const RefundPolicy = () => {
  return (
    <>
        <Meta title={'Chính sách đổi trả'} />
        <BreadCrumb title='Refund-Policy' />
        <div className='policy-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <p>Chính sách đổi trả của chúng tôi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RefundPolicy
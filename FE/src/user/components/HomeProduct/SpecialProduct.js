import React from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
const SpecialProduct = (props) => {
    const {title, _id, brand, totalrating, price, sold, quantity, images} = props;
  return (
    <div className='col-4'>
        <div className='special-product-cart'>
            <div className='d-flex justify-content-between gap-10'>
                <div>
                    <img src={images} className='img-fluid' alt='watch' />
                </div>
                <div className='special-product-content'>
                    <h5 className='brand'>{brand}</h5>
                    <h6 className='title'>{title}</h6>
                    <ReactStars
                        count={5}
                        size={20}
                        value= {totalrating}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <p className='price'>
                        <span className='text-danger'>{Intl.NumberFormat('vi-VN').format(price)} VNĐ</span> 
                        {/* <br></br> <strike>20.850.000 VNĐ</strike> */}
                    </p>
                    <div className='discount-till d-flex align-items-center gap-10'>
                        <p className='mb-0'>
                            <b>5 </b>days
                        </p>
                        <div className='d-flex gap-10 align-items-center'>
                            <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                            <span className='badge rounded-circle p-3 bg-danger'>15</span>:
                            <span className='badge rounded-circle p-3 bg-danger'>23</span>
                        </div>
                    </div>
                    <div className='prod-count my-3'>
                        <p>Số lượng: {quantity}</p>
                        <div className="progress">
                            <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{width: quantity / (quantity + sold) * 100 + "%"}} 
                                aria-valuenow={quantity / (quantity + sold) * 100} 
                                aria-valuemin={quantity} 
                                aria-valuemax={sold + quantity}>
                            </div>
                        </div>
                    </div>
                    
                    <Link 
                        className='button'
                        to={`/product/${_id} `}
                    >
                        Xem sản phẩm
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecialProduct
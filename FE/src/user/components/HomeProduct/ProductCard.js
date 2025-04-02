import React from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist } from "../../features/product/productSlice"
const ProductCard = (props) => {
  const { grid, _id, title, brand, totalrating, price, description, images } =  props
  let location = useLocation();
  const dispatch = useDispatch();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
            <div 
              
              className={`${location.pathname == "/product" ? `gr-${grid}` : "col-2"}`}>
              {/* nếu ở / thì them link product/id, nếu ở product/id thì vẫn lấy link product/id, nếu ở product thì thêm id */}
              <div className='product-card position-relative'>
                <Link 
                  to={`${location.pathname == "/" ? `/product/${_id} ` : location.pathname == "/product/:id" ? `/product/${_id} ` : `${_id}` }`}
                  className='product-card'>
                    <div className='product-image'>
                      <img 
                        src={images?.length && images[0]?.url} 
                        className='img-fluid w-100 object-fit-contain border rounded' 
                        alt="product image" 
                        width={160}
                      />
                      <img 
                        src={images?.length && images[1]?.url} 
                        className='img-fluid w-100 h-100 object-fit-contain border rounded' 
                        alt="product image" 
                        width={160}
                      />
                    </div>
                    <div className='product-details mt-2'>
                      <h6 className='brand'>
                        {brand}
                      </h6>
                      <h5 className='product-title'>
                        {title}
                      </h5>
                      <ReactStars
                        count={5}
                        size={20}
                        value= {totalrating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className={`product-description ${grid === 12 ? "d-block" : "d-none"}`}
                        dangerouslySetInnerHTML={{ __html: description}}
                      >
                      </p>
                      <p className='product-price'>
                        {Intl.NumberFormat('vi-VN').format(price)} VNĐ
                      </p>
                    </div>
                </Link>
                <div className='wishlist-icon position-absolute'>
                      <button 
                        className='border-0 bg-transparent'
                        onClick={() => {addToWish({_id})}}
                      >           
                        <img src="/images/wish.svg" alt="wishlist" />
                      </button>
                </div>
                <div className='action-bar position-absolute'>
                      <div className='d-flex flex-column'>
                        <Link>
                          <img src="/images/prodcompare.svg" alt="compare" />
                        </Link>
                        <Link
                          to={`${location.pathname == "/" ? `/product/${_id} ` : location.pathname == "/product/:id" ? `/product/${_id} ` : `${_id}` }`}
                        >
                          <img src="/images/view.svg" alt="view" />
                        </Link>
                        <Link>
                          <img src="/images/add-cart.svg" alt="addcart" />
                        </Link>
                      </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default ProductCard
import React, {useEffect, useState} from 'react'
import BreadCrumb from '../components/Restore/BreadCrumb';
import Meta from '../components/Restore/Meta';
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { 
    getUserCart, 
    deleteCartProduct, 
    updateQuantityProductCart 
} from '../features/user/userSlice';
const Cart = () => {
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const userCartState = useSelector((state) => state?.auth?.carts)
    useEffect(()=> {
        dispatch(getUserCart());
    },[])
    useEffect(()=> {
        if (productDetail !==null){
            dispatch(updateQuantityProductCart({cartItemId: productDetail?.cartItemId, quantity: productDetail?.quantity}))
            setTimeout(() => {
                dispatch(getUserCart());
            }, 200)
        }
    }, [productDetail])
    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct(id))
        setTimeout(() => {
            dispatch(getUserCart());
        }, 500)
    }
    useEffect(()=> { 
        let sum = 0;
        for (let i = 0; i < userCartState?.length; i++) {
            sum = sum + (Number(userCartState[i].quantity) * userCartState[i].price);
            setTotalAmount(sum)
        }
    },[userCartState])
    return (
    <>
        <Meta title={'Giỏ hàng'} />
        <BreadCrumb title='Cart' />
        <div className='cart-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Sản phẩm</h4>
                            <h4 className="cart-col-2">Giá</h4>
                            <h4 className="cart-col-3">Số lượng</h4>
                            <h4 className="cart-col-4">Tổng tiền</h4>
                        </div>
                        {userCartState?.length === 0 && <div className='mt-2'><p className='text-center'>Bạn chưa thêm sản phẩm</p></div>}
                        {userCartState?.map((item, index) => {
                            return (
                                <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                        <img 
                                            src={item?.productId?.images?.length && item?.productId?.images[0]?.url}
                                            className="img-fluid" 
                                            alt="product image" 
                                        />
                                        </div>
                                        <div className="w-75">
                                            <p>{item?.productId.title}</p>
                                            <p>
                                                <ul className="colors ps-0">
                                                    <li style={{backgroundColor: item?.color?.title}}></li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2">
                                        <h5 className="price">{Intl.NumberFormat('vi-VN').format(item?.price)} VNĐ</h5>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15">
                                        <div>
                                            <input 
                                                className="form-control" 
                                                type="number" 
                                                name="" min={1} 
                                                max={item?.productId?.quantity} 
                                                id="" 
                                                value={productDetail?.quantity ? productDetail?.quantity : item?.quantity} 
                                                onChange={(e) => {setProductDetail({cartItemId:item?._id, quantity:e.target.value})}}
                                            />
                                        </div>
                                        <div>
                                            <AiFillDelete 
                                                onClick={() => {deleteACartProduct(item?._id)}}
                                                className="text-danger pointer" 
                                            />
                                        </div>
                                    </div>
                                    <div className="cart-col-4">
                                        <h5 className="price">{Intl.NumberFormat('vi-VN').format(item?.price * item?.quantity)} VNĐ</h5>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-12 py-2 mt-4'>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className="button">
                                Tiếp tục mua sắm
                            </Link>
                            {
                                totalAmount !== false &&
                                    <div className="d-flex flex-column align-items-end">
                                        <h4>{Intl.NumberFormat('vi-VN').format(totalAmount)} VNĐ</h4>
                                        <p>Giá tiền chưa bao gồm phí ship</p>
                                        <Link to="/checkout" className="button">
                                        Checkout
                                        </Link>
                                    </div>    
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart
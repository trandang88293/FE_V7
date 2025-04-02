import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"
import * as yup from 'yup';
import {useFormik} from 'formik'
import { createOrder, emptyCart, resetState } from '../features/user/userSlice'
import { toast } from 'react-toastify';
let schema = yup.object().shape({
    fullname: yup.string().required("Vui lòng nhập tên của bạn"),
    address: yup.string().required("Vui lòng nhập đia chỉ của bạn"),
    city: yup.string().required("Vui lòng nhập thành phố"),
    mobile: yup.string().required("Vui lòng nhập số điện thoại người nhận")
  });
const Checkout = () => {
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(null)
    const [shipInfo, setShipInfo] = useState(null)
    const [cartProductState, setCartProductState] = useState([])
    const cartState = useSelector((state) => state.auth?.carts)
    useEffect(()=> { 
        let sum = 0;
        for (let i = 0; i < cartState?.length; i++) {
            sum = sum + (Number(cartState[i].quantity) * cartState[i].price);
            setTotalAmount(sum)
        }
    },[cartState])
    useEffect(() => {
        let items = []
        for (let i = 0; i < cartState?.length; i++){
            items.push({
                product:cartState[i].productId._id,
                quantity: cartState[i].quantity,
                color: cartState[i].color._id,
                price: cartState[i].price
            })
        }
        setCartProductState(items)
        
    }, [])
    const formik = useFormik({
        initialValues: {
            fullname: "",
            address: "",
            city: "",
            mobile: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setShipInfo(values)
        }
    })
    const submitOrder = () => {
        if (shipInfo === null){
          toast.error("🦄 Vui lòng Thêm địa chỉ!")
          return false
        } else {
            dispatch(createOrder({
                totalPrice: totalAmount,
                totalPriceAfterDiscount: totalAmount,
                orderItems: cartProductState,
                shippingInfo: shipInfo
            }))
            setTimeout(() => {
                dispatch(emptyCart())
                resetState()
            }, 300)
        }
      }
    
  return (
    <>
        <div className="checkout-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-7">
                     <div className="checkout-left-data">
                        <h3 className="website-name">NQD Store</h3>
                            {/* breadcrumb tự tạo đường dẫn của bootstrap */}
                            <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link className="text-dark total-price" to="/cart">
                                    Giỏ hàng
                                    </Link>
                                </li>
                                &nbsp; /&nbsp;
                                <li
                                    className="breadcrumb-ite total-price active"
                                    aria-current="page"
                                >
                                    Thanh toán
                                </li>
                                {/* &nbsp; /
                                <li className="breadcrumb-item total-price active">
                                    Shipping
                                </li>
                                &nbsp; /
                                <li
                                    className="breadcrumb-item total-price active"
                                    aria-current="page"
                                >
                                    Payment
                                </li> */}
                                </ol>
                            </nav>
                            <h4 className="title total">Thông tin liên lạc</h4>
                            <p className="user-details total">
                                Đông Ngô 69 (69conheocon@gmail.com)
                            </p>
                            <h4 className="mb-3">Địa chỉ giao hàng</h4>
                            <form onSubmit={formik.handleSubmit} className="d-flex gap-15 flex-wrap justify-content-between">
                                <div className="w-100">
                                    <input 
                                        type="text" 
                                        placeholder="Họ và tên người nhận" 
                                        className="form-control"
                                        value= {formik.values.fullname}
                                        onChange={formik.handleChange("fullname")}
                                        onBlur={formik.handleBlur("fullname")}
                                    />
                                    <div className='error mt-2'>
                                        {formik.touched.fullname && formik.errors.fullname}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input 
                                        type="tel" 
                                        placeholder="Số điện thoại người nhận" 
                                        className="form-control" 
                                        value= {formik.values.mobile}
                                        onChange={formik.handleChange("mobile")}
                                        onBlur={formik.handleBlur("mobile")}
                                    />
                                    <div className='error mt-2'>
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        placeholder="Địa chỉ nơi nhận" 
                                        className="form-control" 
                                        value= {formik.values.address}
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                    />
                                    <div className='error mt-2'>
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                
                                {/* <div className="flex-grow-1">
                                    <input type="text" placeholder="Quận / Huyện" className="form-control" />
                                </div> */}
                                <div className="flex-grow-2">
                                    <input 
                                        type="text" 
                                        placeholder="Tỉnh / thành phố" 
                                        className="form-control" 
                                        value= {formik.values.city}
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                    />
                                    <div className='error mt-2'>
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/cart" className="text-dark">
                                        <BiArrowBack className="me-2" />
                                        Quay lại giỏ hàng
                                        </Link>
                                        <button 
                                            
                                            className='button' 
                                            type="submit"
                                        >Thêm địa chỉ
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {
                                cartState && cartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                                            <div className="w-75 d-flex gap-10">
                                                <div className="w-25 position-relative">
                                                    <span
                                                    style={{ top: "-10px", right: "2px" }}
                                                    className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                                    >
                                                     {item?.quantity}
                                                    </span>
                                                    <img 
                                                        className="img-fluid" 
                                                        src={item?.productId?.images?.length && item?.productId?.images[0]?.url} 
                                                        alt="product" />
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.productId.title}</h5>
                                                    <p className="total-price">
                                                        <ul className="colors ps-0">
                                                            <li style={{backgroundColor: item?.color?.title}}></li>
                                                        </ul>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                            <h5 className="total">{Intl.NumberFormat('vi-VN').format(item?.price)} VNĐ</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">Thành tiền</p>
                                <p className="total-price">{Intl.NumberFormat('vi-VN').format(totalAmount)} VNĐ</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Phí ship</p>
                                <p className="mb-0 total-price">30.000 VNĐ</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                            <h4 className="total">Tổng cộng</h4>
                            <h5 className="total-price">{Intl.NumberFormat('vi-VN').format(totalAmount + 30000)} VNĐ</h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <button
                                onClick={() => {submitOrder()}} 
                                className='button' 
                                type="submit"
                            >Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout
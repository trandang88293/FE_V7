import React, { useEffect } from 'react';
import BreadCrumb from '../components/Restore/BreadCrumb';
import Meta from '../components/Restore/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../features/user/userSlice';
import moment from 'moment';

const Order = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.order) || [
        {
            id: 1,
            totalPriceAfterDiscount: 500000,
            orderStatus: 'Đã giao',
            createdAt: '2024-02-22T10:30:00Z'
        }
    ];
    
    useEffect(() => {
        getOrders();
    }, []);
    
    const getOrders = () => {
        dispatch(getUserOrders());
    };

    return (
        <>
            <Meta title={'Đơn hàng của tôi'} />
            <BreadCrumb title='My Order' />
            <div className="order-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className='col-12'>
                            <div className='row bg-warning pt-2'>
                                <div className='col-3'><h5>Mã hóa đơn</h5></div>
                                <div className='col-3'><h5>Tổng giá</h5></div>
                                <div className='col-3'><h5>Trạng thái</h5></div>
                                <div className='col-3'><h5>Ngày đặt</h5></div>
                            </div>
                        </div>
                        <div className='col-12'>
                            {orderState.map((item, index) => (
                                <div className='row bg-white pt-3 border-bottom' key={index}>
                                    <div className='col-3'><p>{item.id}</p></div>
                                    <div className='col-3'><p>{Intl.NumberFormat('vi-VN').format(item.totalPriceAfterDiscount)} VNĐ</p></div>
                                    <div className='col-3'><p>{item.orderStatus}</p></div>
                                    <div className='col-3'><p>{moment(item.createdAt).format('l')}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;

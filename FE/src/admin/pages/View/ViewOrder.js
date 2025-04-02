import React, { useEffect } from 'react'
import { Table } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getOrderById } from "../../features/auth/authSlice";
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
      },
      {
        title: "Thương hiệu",
        dataIndex: "brand",
      },
      {
        title: "Số lượng",
        dataIndex: "count",
      },
      {
        title: "Color",
        dataIndex: "color",
      },
      {
        title: "Đơn giá",
        dataIndex: "amount",
      },
      {
        title: "Tổng giá",
        dataIndex: "total",
      },
];
const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split('/')[3];
  useEffect(() => {
    if (userId !== undefined) {
      dispatch(getOrderById(userId)); //nếu lấy dc ID thì sẽ lấy thông tin của cái id đó ra
    }
  }, [userId]);
  const orderState = useSelector((state) => state?.auth?.orderbyid); //auth.order vì lấy ra đơn hàng của từng auth
  console.log(orderState)
  const data = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      color: orderState?.orderItems[i]?.color.title,
      total: orderState?.totalPriceAfterDiscount,
    })
  }
  console.log(data)
  return (
    <div>
      <h3 className="mb-4 title">Chi tiết hóa đơn</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Link 
        to='/admin/orders' 
        className='btn btn-success border-0 rounded-3 my-5'
      >
        Quay về
      </Link>
    </div>
  );
};

export default ViewOrder

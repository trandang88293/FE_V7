import React, {useEffect, useState} from 'react'
import {BsArrowDownRight, BsArrowUpRight} from 'react-icons/bs'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';
const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Tên người mua',
    dataIndex: 'name',
  },
  {
    title: 'Tổng giá',
    dataIndex: 'price',
  },
  {
    title: 'Tình trạng',
    dataIndex: 'status',
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'createdAt',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch()
  const [dataMonthly, setDataMonthly] = useState([])
  const [dataMonthlySales, setDataMonthlySales] = useState([])
  const monthlyDataState = useSelector((state)=> state.auth.monthlyData)
  const yearlyDataState = useSelector((state)=> state.auth.yearlyData)
  const orderState = useSelector((state) => state?.auth?.orders)
  console.log(orderState)
  useEffect(() => {
    dispatch(getMonthlyData())
    dispatch(getYearlyData())
    dispatch(getOrders())
  }, [])
  useEffect(() => {
    let monthNames = ["January","February","March","April","May","June","July",
                        "August","September","October","November","December"];
    let data = []
    let monthlyOrderCount=[]
    for ( let i = 0; i < monthlyDataState?.length; i++){
      const element = monthlyDataState[i];
      data.push({type: monthNames[element?._id?.month], income: element?.amount})
      monthlyOrderCount.push({type: monthNames[element?._id?.month], sales: element?.count})
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)
  },[monthlyDataState, yearlyDataState])
  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Tháng',
      },
      sales: {
        alias: 'Tổng doanh thu',
      },
    },
  };
  const config1 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Tháng',
      },
      sales: {
        alias: 'Đơn hàng',
      },
    },
  };
  const data = [];
  for (let i = 0; i < orderState?.length ; i++) {
    data.push({
      key: i + 1,
      name: orderState[i]?.user?.fullname,
      status: orderState[i]?.orderStatus,
      createdAt: moment(orderState[i]?.createdAt).format('L'),
      price: orderState[i]?.totalPriceAfterDiscount,
    });
  }
  return (
    <div>
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 '>
          <div>
            <p>Tổng doanh thu</p>
            <h4>{Intl.NumberFormat('vi-VN').format(yearlyDataState && yearlyDataState[0]?.amount)} VNĐ</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'> <BsArrowUpRight />33%</h6>
            <p className='mb-0'>Tính đến tháng 6 - 2023</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 '>
          <div>
            <p>Tổng số đơn hàng</p>
            <h4>{yearlyDataState && yearlyDataState[0]?.count} đơn hàng</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'> <BsArrowUpRight />33%</h6>
            <p className='mb-0'>Tính đến tháng 6 - 2023</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 '>
          <div>
            <p>Tổng lợi nhuận</p>
            <h4>-69.000.000 VNĐ</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'> <BsArrowDownRight />33%</h6>
            <p className='mb-0'>Tính đến tháng 6 - 2023</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mt-4'>Thống kế doanh thu</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mt-4'>Thống kế đơn hàng</h3>
        <div>
          <Column {...config1} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mt-4'>Danh sách đơn hàng</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
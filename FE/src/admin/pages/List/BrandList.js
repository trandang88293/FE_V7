import React, {useEffect, useState} from 'react'
import { Table } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetState
} from "../../features/brand/brandSlice";
import CustomModal from "../../components/CustomModal";
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const BrandList = () => {
  // Deleted Brand
  const [open, setOpen] = useState(false)
  const [brandId, setbrandId] = useState('')
  const showModal = (e) => {
    setOpen(true)
    setbrandId(e)
  }
  const hideModal = (e) => {
    setOpen(false)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data = [];
  for (let i = 0; i < brandState.length; i++) {
    data.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link
             to={`/admin/brand/${brandState[i]._id}`} 
             className=" fs-3 text-danger">
            <AiOutlineEdit />
          </Link>
          <button 
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      )
    });
  }
  const deleteBrand = (values) => { // viết giống hàm validation submit add brand
    dispatch(deleteABrand(values))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBrands()) // xóa xong load lại danh asch1
    }, 1000)
  }
  return (
    <div>
        <h3 className='mb-4'>Danh sách thương hiệu</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Bạn có chắc chắn muốn xóa?"
        />
    </div>
  )
}

export default BrandList
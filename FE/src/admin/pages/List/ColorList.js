import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { 
  deleteAColor, 
  getColors,
  resetState 
} from "../../features/color/colorSlice";
import CustomModal from "../../components/CustomModal"

const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Màu',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const ColorList = () => {
  //delete color
  const [open, setOpen] = useState(false)
  const [colorId, setcolorId] = useState('')
  const showModal = (e) => {
    setOpen(true)
    setcolorId(e) //nhận id từ biến showmodal
  }
  const hideModal = (e) => {
    setOpen(false)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getColors())
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data = [];
  for (let i = 0; i < colorState.length; i++) {
    data.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link 
            to={`/admin/color/${colorState[i]._id}`}
            className=" fs-3 text-danger">
            <AiOutlineEdit />
          </Link>
          <button 
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)} //chuyền id vào biến categoryId ở dòng 30
          >
            <AiOutlineDelete />
          </button>
        </>
      )
    });
  }
  const deleteColor = (values) => { // viết giống hàm validation submit add brand
    dispatch(deleteAColor(values))
    setOpen(false)
    setTimeout(() => {
      dispatch(getColors()) // xóa xong load lại danh sách
    }, 1000)
  }
  return (
    <div>
        <h3 className='mb-4'>Color List</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteColor(colorId);
          }}
          title="Bạn có chắc chắn muốn xóa?"
        />
    </div>
  )
}

export default ColorList
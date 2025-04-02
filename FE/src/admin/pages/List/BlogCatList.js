import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteABlogCategory,
  getCategories,
  resetState,
} from "../../features/blogCat/blogCategorySlice";
import CustomModal from "../../components/CustomModal";
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const BlogCatlist = () => {
  //delete blog categories
  const [open, setOpen] = useState(false)
  const [blogCatId, setBlogCatId] = useState('')
  const showModal = (e) => {
    setOpen(true)
    setBlogCatId(e)
  }
  const hideModal = (e) => {
    setOpen(false)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const blogCatState = useSelector((state) => state.blogCategory.blogCategories);
  const data = [];
  for (let i = 0; i < blogCatState.length; i++) {
    data.push({
      key: i + 1,
      name: blogCatState[i].title,
      action: (
        <>
          <Link 
            to={`/admin/blog-category/${blogCatState[i]._id}`} 
            className=" fs-3 text-danger">
            <AiOutlineEdit />
          </Link>
          <button 
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCatState[i]._id)} //chuyền id vào biến categoryId ở dòng 30
          >
            <AiOutlineDelete />
          </button>
        </>
      )
    });
  }
  const deleteBlogCategory = (values) => { // viết giống hàm validation submit add brand
    dispatch(deleteABlogCategory(values))
    setOpen(false)
    setTimeout(() => {
      dispatch(getCategories()) // xóa xong load lại danh sách
    }, 1000)
  }
  return (
    <div>
        <h3 className='mb-4'>Blog Category List</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlogCategory(blogCatId);
          }}
          title="Bạn có chắc chắn muốn xóa?"
        />
    </div>
  )
}

export default BlogCatlist
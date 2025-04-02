import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  deleteABlog, 
  getBlogs, 
  resetState
} from "../../features/blog/blogSlice";
import CustomModal from "../../components/CustomModal";
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Tên Blog',
      dataIndex: 'name',
    },
    {
      title: 'Danh mục Blog',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const Bloglist = () => {
  //deleted
  const [open, setOpen] = useState(false)
  const [blogId, setblogId] = useState('')
  const showModal = (e) => {
    setOpen(true)
    setblogId(e)
  }
  const hideModal = (e) => {
    setOpen(false)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const getBlogState = useSelector((state) => state.blog.blogs);
  const data = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data.push({
      key: i + 1,
      name: getBlogState[i].title,
      category: getBlogState[i].category,

      action: (
        <>
          <Link 
            to={`/admin/blog/${getBlogState[i]._id}`}
            className=" fs-3 text-danger">
            <AiOutlineEdit />
          </Link>
          <button 
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(getBlogState[i]._id)} //chuyền id vào biến categoryId ở dòng 30
          >
            <AiOutlineDelete />
          </button>
        </>
      )
    });
  }
  const deleteBlog= (values) => { // viết giống hàm validation submit add brand
    dispatch(deleteABlog(values))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBlogs()) // xóa xong load lại danh asch1
    }, 1000)
  }
  return (
    <div>
        <h3 className='mb-4'>Blog List</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlog(blogId);
          }}
          title="Bạn có chắc chắn muốn xóa?"
        />
    </div>
  )
}

export default Bloglist
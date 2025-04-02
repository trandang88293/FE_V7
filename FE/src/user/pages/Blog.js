import React, { useEffect } from 'react'
import BreadCrumb from '../components/Restore/BreadCrumb';
import Meta from '../components/Restore/Meta';
import BlogCard from '../components/HomeProduct/BlogCard';
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from '../features/blog/blogSlice';
const Blog = () => {
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state?.blog?.blogs);
    useEffect(() => {
        getBlogs();
    }, []);
    const getBlogs = () => {
        dispatch(getAllBlogs());
    }
  return(
  <>
    <Meta title={'Blog công nghệ'} />
    <BreadCrumb title='Blog' />
    <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
            <div className="row">
                <div className='col-2'>
                    <div className='filter-card mb-3'>
                        <h3 className='filter-title'>Danh mục bài viết</h3>
                        <div>
                            <ul className='ps-0'>
                                <li>Di động</li>
                                <li>Laptop</li>
                                <li>Tablet</li>
                                <li>Phụ kiện</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <BlogCard 
                    data= {blogState}
                />
            </div>
        </div>
    </div>
  </>
  )
}

export default Blog
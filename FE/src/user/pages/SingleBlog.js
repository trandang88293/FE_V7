import React, {useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/Restore/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Restore/Meta";
import { useDispatch, useSelector } from "react-redux"
import { getABlog } from '../features/blog/blogSlice';
const SingleBlog = () =>{
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state?.blog?.blog);
    const location = useLocation();
    const getBlogId= location.pathname.split('/')[2];
    useEffect(() => {
        getBlog();
    }, []);
    const getBlog = () => {
        dispatch(getABlog(getBlogId));
    }
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
        <Meta title={blogState?.title} />
        <BreadCrumb title={blogState?.title} />
        <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blog" className="d-flex align-items-center gap-10">
                                <HiOutlineArrowLeft className="fs-4" /> Quay lại
                            </Link>
                            <h3 className="title">{blogState?.title}</h3>
                            <img 
                                src={blogState?.images?.length && blogState.images[0]?.url} 
                                className="img-fluid w-100 my-4" 
                                alt="blog"
                            />
                            <p dangerouslySetInnerHTML={{ __html: blogState?.description}}>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SingleBlog
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment" // chỉnh lại createAt
const BlogCard = (props) => {
    const { data } =  props
    let location = useLocation();
    return (
        <>
            {
                data?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`${location.pathname == "/blog" ? `col-5` : "col-3"}`}
                        >
                            <div className="blog-card">
                                <div className="blog-card-img">
                                    <img 
                                        src={item?.images?.length && item.images[0].url} 
                                        className="img-fluid w-100 max-auto object-fit-contain border rounded" 
                                        alt="blog"
                                        width={200}
                                    />
                                </div>
                                <div className="blog-card-content">
                                    <p className="date">{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    <h5 className="title">{item?.title}</h5>
                                    <p className="desc" dangerouslySetInnerHTML={{ __html: item?.description.substr(0, 30) + "..."}}></p>
                                    <Link to={"/blog/" + item?._id} className="button">Xem thêm</Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
            
    )
}

export default BlogCard
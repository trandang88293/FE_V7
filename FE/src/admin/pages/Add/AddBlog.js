import React, { useEffect } from 'react'
import CustomInput from '../../components/CustomInput'
import ReactQuill from 'react-quill' //form edit text
import 'react-quill/dist/quill.snow.css'
import Dropzone from "react-dropzone"
import { delImg, uploadImg } from "../../features/upload/uploadSlice"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../../features/blog/blogSlice";
import { getCategories } from "../../features/blogCat/blogCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên blog"),
  description: yup.string().required("Vui lòng nhập mô tả blog"),
  category: yup.string().required("Vui lòng nhập danh mục blog"),
});
const AddBlog = () => {
  //khai báo hàm cần thiết
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // lấy dữ liệu
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  // gấn dữ liệu cho biến
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images)
  const blogCatState = useSelector((state) => state.blogCategory.blogCategories)
  const newBlog = useSelector((state) => state.blog)
  const {isSuccess, isError, isLoading, createdBlog, blogName, blogDesc, blogCategory, blogImages, updatedBlog} = newBlog
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("🦄 Thêm thành công!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại");
    }
  }, [isSuccess, isError, isLoading]);
  
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.images = img;
  }, [img]);  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });
  return (
    <div>
        <h3 className='mb-4'>
          {getBlogId !== undefined ? "Sửa" : "Thêm"} blog
        </h3>
        <div className=''>
            <form onSubmit={formik.handleSubmit}>
                <div className='mt-3'>
                    <CustomInput 
                      type='text' 
                      label='Nhập tên Blog' 
                      name = 'title'
                      onChange = {formik.handleChange("title")}
                      onBlur = {formik.handleBlur("title")}
                      value={formik.values.title} 
                    />
                </div>
                <div className="error">
                  {formik.touched.title && formik.errors.title}
                </div>
                <select 
                  name="category"
                  onChange={formik.handleChange("category")}
                  onBlur={formik.handleBlur("category")}
                  value={formik.values.category}
                  className="form-control py-3  mt-3"
                  id=""
                >
                    <option value=''>Chọn danh mục Blog</option>
                    {blogCatState.map((i, j) => {
                      return (
                        <option key={j} value={i.title}>
                          {i.title}
                        </option>
                      );
                    })}
                </select>
                <div className="error">
                  {formik.touched.category && formik.errors.category}
                </div>
                <ReactQuill 
                    theme="snow"
                    className="mt-3"
                    name="description"
                    onChange={formik.handleChange("description")}
                    value={formik.values.description} 
                />
                <div className="error">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="bg-white border-1 p-5 text-center mt-3">
                  <Dropzone
                    onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            Kéo 'và' thả một số tệp vào đây hoặc nhấp để chọn tệp
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div className="showimages d-flex flex-wrap gap-3 mt-3">
                  {imgState?.map((i, j) => {
                    return (
                      <div className=" position-relative d-flex col-2" key={j}>
                        <button
                          type="button"
                          onClick={() => dispatch(delImg(i.public_id))}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px" }}
                        ></button>
                        <img src={i.url} alt="" className='img-fluid' />
                      </div>
                    );
                  })}
                </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                  {getBlogId !== undefined ? "Sửa" : "Thêm"} blog
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlog
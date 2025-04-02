import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import Meta from '../components/Restore/Meta'
import BlogCard from '../components/HomeProduct/BlogCard'
import ProductCard from '../components/HomeProduct/ProductCard'
import SpecialProduct from '../components/HomeProduct/SpecialProduct'
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from '../features/blog/blogSlice';
import { getAllProducts } from '../features/product/productSlice'
const Home = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product?.products);
  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  }
  const getProducts = () => {
    dispatch(getAllProducts())
  }
  return (
    <>
      <Meta title={'Trang chủ'} />
      <section className='home-wrapper-1 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div className='main-banner position-relative p-3'>
                <img src="images/main-banner.jpg" alt="main banner" className='img-fluid rounded-3' />
                <div className='main-banner-content position-absolute '>
                  <h5>ĐẶT TRƯỚC NGAY.</h5>
                  <h4>iPhone 13 ProMax.</h4>
                  <p>Chỉ từ 25.900.000 Đ <br />
                  Hoặc trả trước 6.000.000 Đ</p>
                  <Link className='button'>MUA NGAY</Link>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='d-flex gap-10 flex-wrap justify-content-between align-items-center'>
                <div className='small-banner position-relative p-3'>
                  <img src="images/catbanner-01.jpg" alt="main banner" className='img-fluid rounded-3' />
                  <div className='small-banner-content position-absolute '>
                    <h5>SẢN PHẤM BÁN CHẠY.</h5>
                    <h4>Macbook Pro.</h4>
                    <p>Chỉ từ 22.900.000 Đ</p>
                  </div>
                </div>
                <div className='small-banner position-relative p-3'>
                  <img src="images/catbanner-02.jpg" alt="main banner" className='img-fluid rounded-3' />
                  <div className='small-banner-content position-absolute '>
                    <h5>DEAL HOT.</h5>
                    <h4>Săn ngay deal khủng.</h4>
                    <p>Chỉ từ 20.900.000 Đ</p>
                  </div>
                </div>
                <div className='small-banner position-relative p-3'>
                  <img src="images/catbanner-03.jpg" alt="main banner" className='img-fluid rounded-3' />
                  <div className='small-banner-content position-absolute '>
                    <h5>SALE OFF.</h5>
                    <h4>Phá sản giảm sâu.</h4>
                    <p>Chỉ từ 20.900.000 Đ</p>
                  </div>
                </div>
                <div className='small-banner position-relative p-3'>
                  <img src="images/catbanner-04.jpg" alt="main banner" className='img-fluid rounded-3' />
                  <div className='small-banner-content position-absolute '>
                    <h5>SĂN NGAY.</h5>
                    <h4>Phụ kiện giá rẻ.</h4>
                    <p>Chỉ từ 200.000 Đ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='servies d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service.png" alt ="services"/>
                  <div>
                    <h6>Free Shipping</h6>
                    <p className='mb-0'>Cho đơn hàng từ 1 triệu đồng </p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-02.png" alt ="services"/>
                  <div>
                    <h6>Ưu đãi hằng ngày</h6>
                    <p className='mb-0'>Mua là có quà, giảm giá cực sâu</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-03.png" alt ="services"/>
                  <div>
                    <h6>Hỗ trợ 24/7</h6>
                    <p className='mb-0'>Nhân viên hỗ trợ tận tình</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-04.png" alt ="services"/>
                  <div>
                    <h6>Hỗ trợ trả góp</h6>
                    <p className='mb-0'>Lãi xuất 0%</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-05.png" alt ="services"/>
                  <div>
                    <h6>Thanh toán đa dạng</h6>
                    <p className='mb-0'>Bảo mật thông tin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className="categories d-flex flex-wrap justify-content-between align-items-center card-wrapper">
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Máy tính & Laptop</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/pc&laptop.jpg' alt='pc&laptop' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Máy ảnh</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/camera.jpg' alt='camera' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/tv.jpg' alt='smarttv' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/smartwatch.png' alt='smartwatch' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Phụ kiện</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/xbox.jpg' alt='phụ kiện' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Điện thoại $ Tablet</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/phone&tablet.jpg' alt='phone&tablet' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Headphones</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/headphone.jpg' alt='headphone' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Phụ kiện</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/airpod.jpg' alt='phụ kiện' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Loa Bluetooth </h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/loabluetooth.jpg' alt='loabluetooth' />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Phụ kiện</h6>
                    <p>10 Item</p>
                  </div>
                  <img src='images/xbox.jpg' alt='phụ kiện' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='featured-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Sản phẩm nổi bật</h3>
            </div>
          </div>
          <div className='row'>
            {
              productState && productState?.map((item, index) => {
                if (item?.tags === "Featured") {
                  return <ProductCard
                            key={index} 
                            _id={item?._id} 
                            title={item?.title}
                            brand={item?.brand}
                            totalrating={item?.totalrating.toString()}
                            price={item?.price}
                            description={item?.description}
                            images={item?.images}
                          />
                }
              })
            }
          </div>
        </div>
      </section>
      <section className='famous-wrapper py-5 home-wrapper-2'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-01.webp' className='img-fluid' alt='famous-01' />
              <div className='famous-content position-absolute'>
                <h5>Màn hình lớn</h5>
                <h6 className='color-white'>Apple Watch Series 7</h6>
                <p>Chỉ từ 15.000.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-02.webp' className='img-fluid' alt='famous-01' />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Thiết kế sang trọng</h5>
                <h6 className='text-dark'>Macbook Pro M2.</h6>
                <p className='text-dark'>16-inch Retina Display</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-03.webp' className='img-fluid' alt='famous-01' />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Điện thoại</h5>
                <h6 className='text-dark'>Iphone 14 ProMax.</h6>
                <p className='text-dark'>Chỉ từ 25.000.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-04.webp' className='img-fluid' alt='famous-01' />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Phụ kiện điện tử</h5>
                <h6 className='text-dark'>Trang thiết bị nội thất</h6>
                <p className='text-dark'>Mang lại sự tiên nghi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      <section className='special-wrapper py-5 home-wrapper-2 '>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Sản phẩm hot</h3>
            </div>
          </div>
          <div className='row'>
            {
              productState && productState?.map((item, index) => {
                if (item?.tags === "Special"){
                  return <SpecialProduct 
                            key={index}
                            _id={item?._id} 
                            title={item?.title}
                            brand={item?.brand}
                            totalrating={item?.totalrating.toString()}
                            price={item?.price}
                            sold={item?.sold}
                            quantity={item?.quantity}
                            images={item.images[0]?.url}
                            />
                }
              })
            }
          </div>
        </div>
      </section>
      <section className='popular-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Sản phẩm bán chạy</h3>
            </div>
          </div>
          <div className='row'>
            {
              productState && productState?.map((item, index) => {
                if (item?.tags === "Popular"){
                  return <ProductCard
                            key={index} 
                            _id={item?._id} 
                            title={item?.title}
                            brand={item?.brand}
                            totalrating={item?.totalrating.toString()}
                            price={item?.price}
                            description={item?.description}
                            images={item?.images}
                          />
                }
              })
            }
          </div>
        </div>
      </section>
      <section className='marque-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='marquee-inner-wrapper card-wrapper'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='blog-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Blog công nghệ</h3>
            </div>
          </div>
          <div className='row'>
                <BlogCard 
                   data= {blogState}
                />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
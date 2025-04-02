import React, {useEffect, useState}  from 'react'
import ReactStars from "react-rating-stars-component";
import BreadCrumb from '../components/Restore/BreadCrumb';
import Meta from '../components/Restore/Meta';
import Color from '../components/Restore/Color';
import ProductCard from '../components/HomeProduct/ProductCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { getAProduct, rateProduct, addToWishlist } from '../features/product/productSlice';
import { addProductToCart, getUserCart } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const productState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.carts);
  const getProductId= location.pathname.split('/')[2];
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart())
  }, []);
  //kiểm tra xem sản phẩm đã từng add hay chưa
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId===cartState[index]?.productId?._id){
        setAdded(true);
      }
    }
  },[])
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  const uploadCart = () => {
    if (color === null){
      toast.error("🦄 Vui lòng chọn màu sắc!")
      return false
    } else {
      dispatch(addProductToCart({
        productId:productState?._id,
        quantity,
        color,
        price:productState?.price
      }))
    }
  }
  useEffect(() => {
    window.scrollTo(0, 200);
  }, []);
  const addRatingProduct = () => {
    if (star === null){
      toast.error("Vui lòng chọn số sao bạn muốn đánh giá!")
      return false
    } else if (comment === null) {
      toast.error("Vui lòng viết đánh giá")
      return false
    } else {
      dispatch(rateProduct({
        star: star,
        comment: comment,
        prodId: getProductId
      }))
    }
  }
  const [orderedProduct, setorderedProduct] = useState(true);
  //lấy link url của sản phẩm
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <>
        <Meta title={productState?.title} />
        <BreadCrumb title={productState?.title} />
        <div className='main-product-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='main-product-image'>
                          <div>
                            {/* <ReactImageZoom {...props} /> */}
                            <img 
                              src={productState?.images?.length && productState.images[0]?.url} 
                              className="img-fluid" 
                              alt="" 
                            />
                          </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                          <div>
                            <img 
                              src={productState?.images?.length && productState.images[1]?.url} 
                              className="img-fluid" 
                              alt="" 
                            />
                          </div>
                          <div>
                            <img 
                              src={productState?.images?.length && productState.images[2]?.url}
                              className="img-fluid" 
                              alt="" 
                            />
                          </div>
                          <div>
                            <img 
                              src={productState?.images?.length && productState.images[3]?.url} 
                              className="img-fluid" 
                              alt="" 
                          />
                          </div>
                          <div>
                            <img 
                              src={productState?.images?.length && productState.images[4]?.url} 
                              className="img-fluid" 
                              alt="" 
                            />
                          </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='main-product-details'>
                          <div className="border-bottom">
                            <h3 className="title">
                            {productState?.title}
                            </h3>
                          </div>
                          <div className="border-bottom py-3">
                            <p className="price">{Intl.NumberFormat('vi-VN').format(productState?.price)} VNĐ</p>
                            <div className="d-flex align-items-center gap-10">
                              <ReactStars
                                count={5}
                                size={24}
                                value={productState?.totalrating}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p className="mb-0 t-review">( {productState?.ratings?.length} lượt đánh giá )</p>
                            </div>
                            {orderedProduct && (
                              <a className="review-btn" href="#review">
                                Đánh giá sản phẩm
                              </a>
                            )}
                          </div>
                          <div className='py-3'>
                            {/* <div className="d-flex gap-10 align-items-center my-2">
                              <h3 className="product-heading">Loại :</h3>
                              <p className="product-data">{productState?.category}</p>
                            </div> */}
                            <div className="d-flex gap-10 align-items-center my-2">
                              <h3 className="product-heading">Thương hiệu :</h3>
                              <p className="product-data">{productState?.brand}</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                              <h3 className="product-heading">Danh mục :</h3>
                              <p className="product-data">{productState?.category}</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                              <h3 className="product-heading">Tags :</h3>
                              <p className="product-data">{productState?.tags}</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                              <h3 className="product-heading">Trạng thái :</h3>
                              <p className="product-data">Còn hàng</p>
                            </div>
                            {
                              added === false &&
                              <>
                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                  <h3 className="product-heading">Màu sắc :</h3>
                                  <Color setColor={setColor} colorData={productState?.color} />
                                </div>
                              </>
                            }
                            <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                              {
                                added === false &&
                                <>
                                  <h3 className="product-heading">Số lượng :</h3>
                                  <div className="">
                                    <input
                                      type="number"
                                      name=""
                                      min={1}
                                      max={10}
                                      className="form-control"
                                      style={{ width: "70px" }}
                                      id=""
                                      onChange={(e) => setQuantity(e.target.value)}
                                      value={quantity}
                                    />
                                  </div>
                                </>
                              }
                              <div className="d-flex align-items-center gap-30 ms-5">
                                <button 
                                  className="button border-0" 
                                  // data-bs-toggle="modal" 
                                  // data-bs-target="#staticBackdrop" 
                                  type="button"
                                  onClick={() => {added ? navigate('/cart') : uploadCart()}}
                                >
                                  {added ? "Xem giỏ hàng" : "Thêm vào giỏ hàng"}
                                </button>
                                {/* <button className="button signup">Mua ngay</button> */}
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-15">
                              <div>
                                <a href="">
                                  <TbGitCompare className="fs-5 me-2" /> Thêm vào danh sách so sánh
                                </a>
                              </div>
                              <div>
                                <button 
                                  className='border-0 bg-transparent'
                                  onClick={() => {addToWish({getProductId})}}
                                >
                                  <AiOutlineHeart className="fs-5 me-2" /> Thêm vào danh sách yêu thích
                                </button>
                              </div>
                            </div>
                            <div className="d-flex gap-10 flex-column  my-3">
                              <h3 className="product-heading">Giao hàng và đổi trả :</h3>
                              <p className="product-data">
                                Freeship cho đơn hàng nhận trực tiếp tại cửa hàng <br /> 
                                Giao hàng trên toàn quốc, có thể thanh toán trực tiếp khi nhận hàng 
                                <b> sau 4-5 ngày đặt hàng!</b>
                              </p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-3">
                              <h3 className="product-heading">Link sản phẩm:</h3>
                              {/* javascript:void(0) khi bấm vào thẻ a sẽ k bị reload lại chuyển trang */}
                              <a
                                href="javascript:void(0);" 
                                onClick={() => {
                                  copyToClipboard(
                                    window.location.href
                                  );
                                }}
                              >
                                Sao chép link sản phẩm
                              </a>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='description-wrapper py-5 home-wrapper-2'>
          <div className='container-xxl'>
            <div className='row'>
              <div className='col-12'>
                <div className='bg-white p-3'>
                  <h4>Thông số kĩ thuật</h4>
                  <p dangerouslySetInnerHTML={{ __html: productState?.description}}>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='reviews-wrapper py-5 home-wrapper-2'>
          <div className='container-xxl'>
            <div className='row'>
              <div className='col-12'>
                <h3 id="review">Đánh giá</h3>
                <div className="review-inner-wrapper">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4 className="mb-2">Tổng đánh giá của người dùng</h4>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={productState?.totalrating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0">{productState?.ratings?.length} lượt đánh giá</p>
                      </div>
                    </div>
                    {orderedProduct && (
                      <div>
                        <a className="text-dark text-decoration-underline" href="">
                          Đánh giá sản phẩm
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="review-form py-4">
                    <h4>Đánh giá sản phẩm</h4>
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          edit={true}
                          activeColor="#ffd700"
                          onChange={(e) => {
                            setStar(e)
                          }}
                        />
                      </div>
                      <div>
                        <textarea
                          name=""
                          id=""
                          className="w-100 form-control"
                          cols="30"
                          rows="4"
                          placeholder="Comments"
                          onChange={(e) => {
                            setComment(e.target.value)
                          }}
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button 
                          onClick={addRatingProduct}
                          className="button border-0 mt-3" 
                          type='button'
                        >
                          Đánh giá
                        </button>
                      </div>
                  </div>
                  <div className="reviews mt-4">
                    {
                      productState && productState.ratings?.map((item, index) => {
                        return (
                          <div key ={index} className="review">
                            <div className="d-flex gap-10 align-items-center">
                              {/* <h6 className="mb-0">{item?.</h6> */}
                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.star}
                                edit={false}
                                activeColor="#ffd700"
                              />
                            </div>
                            <p className="mt-3">
                              {item?.comment}
                            </p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='popular-wrapper py-5 home-wrapper-2'>
          <div className='container-xxl'>
            <div className='row'>
              <div className='col-12'>
                <h3 className='section-heading'>Sản phẩm bán chạy</h3>
              </div>
            </div>
            <div className='row'>
              {/* <div className='col-2'></div>
              <div className='col-2'></div> */}
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
        {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header py-0 border-0">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-0">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 w-50">
                    <img src='/images/watch.jpg' className="img-fluid" alt="product image" />
                  </div>
                  <div className="d-flex flex-column flex-grow-1 w-50">
                    <h6 className="mb-3">Apple Watch</h6>
                    <p className="mb-1">Quantity: asgfd</p>
                    <p className="mb-1">Color: asgfd</p>
                    <p className="mb-1">Size: asgfd</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 py-0 justify-content-center gap-30">
                <button type="button" className="button" data-bs-dismiss="modal">
                  Xem giỏ hàng
                </button>
                <button type="button" className="button signup">
                  Thanh toán
                </button>
              </div>
              <div className="d-flex justify-content-center py-3">
                <Link
                  className="text-dark"
                  to="/product"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Continue To Shopping
                </Link>
              </div>
            </div>
          </div>
        </div> */}
    </>
  )
}

export default SingleProduct
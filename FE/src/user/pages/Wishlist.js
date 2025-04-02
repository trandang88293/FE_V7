import React, {useEffect} from 'react';
import BreadCrumb from '../components/Restore/BreadCrumb';
import Meta from '../components/Restore/Meta';
import { useDispatch, useSelector } from "react-redux"
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/product/productSlice';


const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistFromDb();
    }, []);
    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist())
    };
    const wishlistState = useSelector((state)=>state?.auth?.wishlist?.wishlist)
    console.log(wishlistState)
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id))
        setTimeout(() => {
            dispatch(getUserProductWishlist())
        }, 1000);
    }
  return (
    <>
        <Meta title={'Wishlist'} />
        <BreadCrumb title='Wishlist' />
        <div className="wishlist-product-wrapper py-5 home-wrapper-2">
            <div className='container-xxl'>
                <div className='row'>
                    {/* {wishlistState?.length === 0 && <div><p className='text-center'>Bạn chưa thêm sản phẩm</p></div>} */}
                    {
                        wishlistState?.map((item, index) =>{
                            return (
                                <div className="col-3" key={index}>
                                    <div className="wishlist-card position-relative">
                                        <img 
                                            src="images/cross.svg" 
                                            alt="cross" 
                                            className="position-absolute cross img-fluid" 
                                            onClick={() => {
                                                removeFromWishlist(item?._id)
                                            }}
                                        />
                                        <div className="wishlist-card-image bg-white">
                                            <img 
                                                src={item?.images?.length && item.images[0]?.url}
                                                className="img-fluid w-100 mx-auto" 
                                                alt="watch" 
                                                width={160}
                                            />
                                        </div>
                                        <div className="py-3 px-3">
                                            <h5 className="title">{item?.title}</h5>
                                            <h6 className="price">{Intl.NumberFormat('vi-VN').format(item?.price)} VNĐ</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Wishlist
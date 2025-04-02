import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFundView } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetState, deleteAProduct } from '../../features/product/productSlice';
import { getCategories } from '../../features/category/categorySlice';
import { Link } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    sorter: (a, b) => a.productId - b.productId,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Danh mục',
    dataIndex: 'categoryId',
    sorter: (a, b) => a.categoryId - b.categoryId,
  },
  // {
  //   title: 'Giá',
  //   dataIndex: 'price',
  //   sorter: (a, b) => a.price - b.price,
  // },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    render: (isActive) => (
      <span className={`badge ${isActive ? "bg-success text-white" : "bg-danger text-white"}`}>
        {isActive ? "Đang bán" : "Ngừng bán"}
      </span>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
    dispatch(getCategories())
  }, [dispatch]);

  
  const productState = useSelector((state) => state.product.products);  
  const data = (productState?.data || []).map((product, index) => {
  return {
    key: index + 1,
    name: product.name || "Không tồn tại",
    description: product.description || "Không tồn tại",
    categoryId: product.category ? product.category.categoryName : "Không tồn tại",  // Đổi categoryId thành tên danh mục
    price: `${product.price} VNĐ` || "Không tồn tại",
    isActive: product.isActive,
    action: (
      <>
        <Link to={`/admin/product/${product.productId}`} className='fs-3 text-danger'>
          <AiOutlineEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(product.productId)}
        >
          <AiOutlineDelete />
        </button>
        <Link to={`/admin/product-detail/${product.productId}`} className=' ms-3 fs-3 text-danger'>
          <AiOutlineFundView />
        </Link>
      </>
    ),
  };
});



  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 1000);
  };

  return (
    <>
      <div>
        <h3 className='mb-4'>Danh sách sản phẩm</h3>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => deleteProduct(productId)}
          title='Bạn có chắc chắn muốn ngừng kinh doanh mặt hàng này?'
        />
      </div>
    </>
  );
};

export default ProductList;

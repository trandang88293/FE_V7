import { useParams } from "react-router-dom";
import { createProducts, getAProduct, updateAProduct } from "../../features/product/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../features/category/categorySlice";

const AddProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.category?.categories || []);
  const [productData, setProductData] = useState({
    productId: "",
    name: "",
    description: "",
    price: "",
    categoryId: "",
    isActive: true,
  });

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }

    if (productId) {
      dispatch(getAProduct(productId)).then((res) => {
        if (res.payload?.data) {
          const product = res.payload.data;
          setProductData({
            productId: product.productId || "",
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            categoryId: product.category ? product.category.categoryId : "",
            isActive: product.isActive ?? true,
          });
        }
      });
    }
  }, [dispatch, productId, categories.length]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({ 
      ...productData, 
      [name]: name === "categoryId" ? Number(value) : type === "checkbox" ? checked : value 
    });
  };

  const handleReset = () => {
    setProductData({ name: "", description: "", price: "", categoryId: "", isActive: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...productData,
      price: parseFloat(productData.price),
      category: { categoryId: Number(productData.categoryId) }, // Đúng format backend yêu cầu
    };
  
    if (productId) {
      dispatch(updateAProduct(newProduct)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          alert("Cập nhật sản phẩm thành công!");
          navigate("/admin/product-list");
        }
      });
    } else {
      dispatch(createProducts(newProduct)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          alert("Thêm sản phẩm thành công!");
          navigate("/admin/product-list");
        }
      });
    }
  };  

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">{productId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Tên sản phẩm</label>
            <input type="text" id="name" name="name" value={productData.name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Mô tả</label>
            <textarea id="description" name="description" value={productData.description} onChange={handleChange} className="form-control"></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Danh mục</label>
            <select id="categoryId" name="categoryId" value={productData?.categoryId} onChange={handleChange} className="form-select" required>
              <option value="">Chọn danh mục</option>
              {categories.data?.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Giá</label>
            <input type="number" id="price" name="price" value={productData.price} onChange={handleChange} className="form-control" step="0.01" required />
          </div>

          {productId && (
            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="statusSwitch" name="isActive" checked={productData.isActive} onChange={handleChange} />
              <label className="form-check-label" htmlFor="statusSwitch">
                {productData.isActive ? "Sản phẩm đang được bán" : "Sản phẩm đã ngừng bán"}
              </label>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">{productId ? "Cập nhật" : "Lưu sản phẩm"}</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Đặt lại</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

import axios from "axios"
import { config } from "../../utils/axiosconfig"
import { base_url } from "../../utils/base_url"

const getProducts = async () => {
  const response = await axios.get(`${base_url}admin/product/get-all`)
  return response.data
}
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}admin/product/add`, product)

  return response.data;
}

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}admin/product/update/${product.productId}`,
    {
      name: product.name,
      description: product.description,
      category: {
        categoryId: product.category.categoryId, 
      },
      price: product.price,
      isActive: product.isActive,
    }  );

  return response.data;
};
const getProduct = async (id) => {
  const response = await axios.get(`${base_url}admin/product/get-by-id/${id}`);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}admin/product/delete/${id}`);

  return response.data;
};

const addProductAttribute = async (productId, productAttribute) => {
  const response = await axios.post(`${base_url}admin/product-attribute/create/${productId}`, productAttribute);
  return response.data;
};

const getProductAttributes = async (productId) => {
  const response = await axios.get(`${base_url}admin/product-attribute/get-by-id/${productId}`);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  addProductAttribute,
  getProductAttributes
};

export default productService;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, addProductAttribute, getProductAttributes } from "../../features/product/productSlice";
import { getAttributes } from "../../features/attribute/attributeSlice";
import { getAttributeValues } from "../../features/attributeValue/attributeValueSlice";
import { Button, Image, Input, message, Table } from "antd";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const attributes = useSelector((state) => state.attribute?.attributes?.data || []);
  const attributeValues = useSelector((state) => state.attributeValues?.attributeValues || {});
  const productAttributes = useSelector((state) => state.product?.productAttributes || []); // Lấy danh sách biến thể từ state

  const [productData, setProductData] = useState({ name: "", description: "", price: "" });
  const [variants, setVariants] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const [newVariant, setNewVariant] = useState({
    attributeValues: {},
    price: "",
    stockQuantity: 0,
    imageUrl: "",
  });

  useEffect(() => {
    dispatch(getAttributes());
    if (productId) {
      dispatch(getAProduct(productId)).then((res) => {
        if (res.payload?.data) {
          setProductData(res.payload.data);
        }
      });
      dispatch(getProductAttributes(productId)); // Lấy danh sách biến thể
    }
  }, [dispatch, productId]);

  const handleAttributeChange = (index, attrId) => {
    const updatedAttributes = [...selectedAttributes];
    updatedAttributes[index] = attrId;
    setSelectedAttributes(updatedAttributes);
  
    if (attrId && !attributeValues[attrId]) {
      dispatch(getAttributeValues(attrId));
    }
  };  

  const handleAttributeValueChange = (attrId, value) => {
    setNewVariant({
      ...newVariant,
      attributeValues: { ...newVariant.attributeValues, [attrId]: value },
    });
  };

  const handleAddVariant = () => {
    if (Object.keys(newVariant.attributeValues).length > 0 && newVariant.price) {
      const productAttribute = {
        sku: `SKU-${Date.now()}`,
        price: parseFloat(newVariant.price),
        stockQuantity: parseInt(newVariant.stockQuantity, 10),
        imageUrl: newVariant.imageUrl || "default.jpg",
        productAttributeValues: Object.entries(newVariant.attributeValues).map(
          ([attrId, valId]) => ({
            attribute: { attributeId: parseInt(attrId) },
            value: { id: parseInt(valId) },
          })
        ),
      };
  
      dispatch(addProductAttribute({ productId, productAttribute }))
        .unwrap() // Sử dụng unwrap để xử lý kết quả của async thunk
        .then(() => {
          message.success("Thêm biến thể thành công!"); // Thông báo thành công
          setVariants([...variants, newVariant]);
          setNewVariant({ attributeValues: {}, price: "", stockQuantity: 0, imageUrl: "" });
        })
        .catch((error) => {
          message.error("Thêm biến thể thất bại: " + (error?.message || "Lỗi không xác định")); // Thông báo lỗi
        });
    }
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...selectedAttributes];
    updatedAttributes.splice(index, 1);
    setSelectedAttributes(updatedAttributes);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleQuantityChange = (variantId, quantity) => {
    // dispatch(updateProductAttribute({ productId, variantId, stockQuantity: parseInt(quantity, 10) }));
  };

  const handlePriceChange = (variantId, price) => {
    // dispatch(updateProductAttribute({ productId, variantId, price: parseFloat(price) }));
  };

  // const handleRemoveVariant = (variantId) => {
  //   dispatch(deleteProductAttribute({ productId, variantId }));
  // };

  const columns = [
    {
      title: "Thuộc tính",
      dataIndex: "productAttributeValues",
      key: "attributes",
      render: (productAttributeValues) => (
        <span>
          {productAttributeValues.map((pav) => (
            <span key={pav.id}>
              <span style={{fontWeight:"bold"}}>{pav.attribute.attributeName}</span>: {pav.value.name} <br/>
            </span>
          ))}
        </span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <Input
          type="number"
          value={price}
          onChange={(e) => handlePriceChange(record.id, e.target.value)}
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      render: (stockQuantity, record) => (
        <Input
          type="number"
          value={stockQuantity}
          onChange={(e) => handleQuantityChange(record.id, e.target.value)}
        />
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => <Image src={imageUrl} width={50} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleRemoveVariant(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Chi tiết sản phẩm</h2>
        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">Tên sản phẩm</label>
            <input type="text" className="form-control" value={productData.name} disabled />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Giá</label>
            <input type="number" className="form-control" value={productData.price} disabled />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea className="form-control" value={productData.description} disabled></textarea>
        </div>
      </div>

      <div className="card shadow-sm p-4 mt-4">
        <h3>Thêm biến thể</h3>

        {selectedAttributes.map((attrId, index) => (
          <div key={index} className="mb-3 d-flex align-items-center">
            <select
              className="form-select me-2"
              value={attrId}
              onChange={(e) => handleAttributeChange(index, e.target.value)}
            >
              <option value="">Chọn thuộc tính</option>
              {attributes.map((attribute) => (
                <option key={attribute.attributeId} value={attribute.attributeId}>
                  {attribute.attributeName}
                </option>
              ))}
            </select>

            {attrId && (
              <select
                className="form-select me-2"
                value={newVariant.attributeValues[attrId] || ""}
                onChange={(e) => handleAttributeValueChange(attrId, e.target.value)}
              >
                <option value="">Chọn giá trị</option>
                {(attributeValues?.[attrId] || []).map((val) => (
                  <option key={val.attributeValueId} value={val.attributeValueId}>
                    {val.attributeValueName}
                  </option>
                ))}
              </select>
            )}

            <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveAttribute(index)}>
              ❌
            </button>
          </div>
        ))}

        <button className="btn btn-secondary btn-sm mb-3" onClick={() => setSelectedAttributes([...selectedAttributes, ""])}>  
          + Thêm thuộc tính  
        </button>  

        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            value={newVariant.price}
            onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
            placeholder="Nhập giá"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng trong kho</label>
          <input
            type="number"
            className="form-control"
            value={newVariant.stockQuantity}
            onChange={(e) => setNewVariant({ ...newVariant, stockQuantity: e.target.value })}
            placeholder="Nhập số lượng"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Chọn ảnh sản phẩm</label>
          <input
            type="text"
            className="form-control"
            value={newVariant.imageUrl}
            onChange={(e) => setNewVariant({ ...newVariant, imageUrl: e.target.value })}
            placeholder="Nhập URL ảnh hoặc tải ảnh lên"
          />
        </div>

        <button className="btn btn-primary" onClick={handleAddVariant}>
          Thêm biến thể
        </button>
      </div>

      <div className="card shadow-sm p-4 mt-4">
        <h3>Danh sách biến thể</h3>
        <Table dataSource={productAttributes} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default ProductDetail;

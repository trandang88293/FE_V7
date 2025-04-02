import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Table, message, Modal } from "antd";

const API_BASE_URL = "http://localhost:8080/admin/category";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`);
      if (response.data.status) {
        setCategories(response.data.data);
      } else {
        message.error("Lỗi khi tải danh sách danh mục");
      }
    } catch (error) {
      message.error("Lỗi kết nối đến server");
    }
  };
  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      message.warning("Vui lòng nhập tên danh mục");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, {
        categoryId,
        categoryName
      });
      if (response.data.status) {
        message.success(categoryId ? "Cập nhật danh mục thành công" : "Thêm danh mục thành công");
        setCategoryName("");
        setCategoryId(null);
        fetchCategories();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Lỗi khi lưu danh mục");
    }
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleEditCategory = (category) => {
    setCategoryId(category.categoryId);
    setCategoryName(category.categoryName);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete`, {
        params: { categoryId },
      });
      if (response.data.status) {
        message.success("Xóa danh mục thành công");
        fetchCategories();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Lỗi khi xóa danh mục");
    }
    setLoading(false);
  };
  
  const columns = [
    { title: "ID", dataIndex: "categoryId", key: "categoryId" },
    { title: "Tên danh mục", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEditCategory(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDeleteCategory(record.categoryId)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý Danh Mục</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Input
          placeholder="Nhập tên danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button type="primary" onClick={handleSaveCategory} loading={loading}>
          {categoryId ? "Cập nhật" : "Thêm"}
        </Button>
      </div>
      <Table dataSource={categories} columns={columns} rowKey="categoryId" />

      <Modal
        title={categoryId ? "Cập nhật danh mục" : "Thêm danh mục"}
        open={isModalVisible}
        onOk={handleSaveCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Nhập tên danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

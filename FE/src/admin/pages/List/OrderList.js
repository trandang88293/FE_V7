import { useEffect, useState } from "react";
import { Table, Button, Input, Card, message } from "antd";
import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

// Formatter chuyển đổi sang định dạng tiền tệ VND
const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function OrderManagement() {
  const [ordersData, setOrdersData] = useState({
    content: [],
    totalPages: 0,
    number: 0,
  });
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;
  // Lưu trang hiện tại được hiển thị
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, keyword]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(API_URL, {
        params: { keyword, page: currentPage, size: pageSize },
      });
      setOrdersData(data);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách đơn hàng");
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const { data } = await axios.get(`${API_URL}/${orderId}/details`);
      setOrderDetails(data);
      const order = ordersData.content.find(o => o.orderId === orderId);
      setSelectedOrder(order);
      setIsDetailsVisible(true);
    } catch (error) {
      message.error("Lỗi khi lấy chi tiết đơn hàng");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/${orderId}`);
      message.success("Xóa đơn hàng thành công");
      fetchOrders();
    } catch (error) {
      message.error("Lỗi khi xóa đơn hàng");
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchOrders();
  };

  const handleBackToOrders = () => {
    setIsDetailsVisible(false);
    setSelectedOrder(null);
  };

  // Định nghĩa cột cho bảng đơn hàng
  const columns = [
    { title: "Mã đơn hàng", dataIndex: "orderId", key: "orderId" },
    { title: "Ngày đặt", dataIndex: "orderDate", key: "orderDate" },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => vndFormatter.format(text),
    },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Tên người dùng",
      dataIndex: ["account", "username"],
      key: "username",
    },
    {
      title: "Họ tên",
      dataIndex: ["account", "name"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["account", "email"],
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: ["account", "phone"],
      key: "phone",
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (_, record) => (
        <span>
          {record.address?.street}, {record.address?.wardId}, {record.address?.districtId}, {record.address?.provinceId}
        </span>
      ),
    },
    {
      title: "Mã giảm giá",
      dataIndex: ["coupon", "code"],
      key: "coupon",
    },
    {
      title: "Giá trị giảm (%)",
      dataIndex: ["coupon", "discountPercentage"],
      key: "discountPercentage",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => fetchOrderDetails(record.orderId)}>Chi tiết</Button>
          <Button danger type="link" onClick={() => deleteOrder(record.orderId)}>Xóa</Button>
        </>
      ),
    },
  ];

  // Cấu hình phân trang cho bảng
  const paginationConfig = {
    current: currentPage + 1,
    pageSize: pageSize,
    total: ordersData.totalElements || ordersData.totalPages * pageSize,
    onChange: (page) => setCurrentPage(page - 1),
    showSizeChanger: false,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card title="Quản lý đơn hàng" bordered={false}>
        {!isDetailsVisible ? (
          <>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
              <Input.Search
                placeholder="Tìm kiếm theo tên đơn hàng, tài khoản hoặc username"
                enterButton="Tìm kiếm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onSearch={handleSearch}
                style={{ width: "400px" }}
              />
            </div>
            <Table
              dataSource={ordersData.content}
              columns={columns}
              rowKey="orderId"
              pagination={paginationConfig}
            />
          </>
        ) : (
          <div>
            <Button onClick={handleBackToOrders} style={{ marginBottom: 16 }}>Quay lại danh sách đơn hàng</Button>
            <Card title={`Chi tiết đơn hàng ${selectedOrder.orderId}`} style={{ marginBottom: 16 }}>
              <p>
                <b>Khách hàng:</b> {selectedOrder.account.username} - {selectedOrder.account.name} ({selectedOrder.account.email})
              </p>
              <p>
                <b>Số điện thoại:</b> {selectedOrder.account.phone}
              </p>
              <p>
                <b>Mã giảm giá:</b> {selectedOrder.coupon ? selectedOrder.coupon.code : "Không có"} - Giảm {selectedOrder.coupon ? selectedOrder.coupon.discountPercentage : 0}%
              </p>
              <p>
                <b>Tổng tiền:</b> {vndFormatter.format(selectedOrder.totalAmount)}
              </p>
            </Card>
            <Table
              dataSource={orderDetails}
              rowKey="orderDetailId"
              pagination={{ pageSize: 5 }}
            >
              <Table.Column title="Mã chi tiết" dataIndex="orderDetailId" key="orderDetailId" />
              <Table.Column title="Số lượng" dataIndex="quantity" key="quantity" />
              <Table.Column
                title="Giá"
                dataIndex="price"
                key="price"
                render={(text) => vndFormatter.format(text)}
              />
              <Table.Column title="Sản phẩm" dataIndex={["productAttribute", "product", "name"]} key="product" />
              <Table.Column title="Mã SKU" dataIndex={["productAttribute", "sku"]} key="sku" />
              <Table.Column
                title="Ảnh sản phẩm"
                dataIndex={["productAttribute", "imageUrl"]}
                key="imageUrl"
                render={(text) => <img src={text} alt="Sản phẩm" width={50} />}
              />
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

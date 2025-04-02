import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/api/orders";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/${id}`).then((res) => setOrder(res.data));
    axios.get(`${API_BASE_URL}/${id}/details`).then((res) => setDetails(res.data));
  }, [id]);

  return order ? (
    <div>
      <h2>Chi tiết đơn hàng {order.id}</h2>
      <p>Ngày tạo: {order.date}</p>
      <table border="1">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.productName}</td>
              <td>{detail.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/orders")}>Quay lại</button>
    </div>
  ) : null;
}

export default OrderDetail;

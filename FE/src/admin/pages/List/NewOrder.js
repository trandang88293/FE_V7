import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/api/orders";

function NewOrder() {
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const createOrder = () => {
    axios.post(API_BASE_URL, { date }).then(() => navigate("/orders"));
  };

  return (
    <div>
      <h2>Tạo đơn hàng</h2>
      <input placeholder="Nhập ngày tạo" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={createOrder}>Lưu</button>
    </div>
  );
}

export default NewOrder;

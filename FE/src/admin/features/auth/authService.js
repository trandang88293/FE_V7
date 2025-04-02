import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig" //check token thuộc quyền nào
const login = async (userData) => {
    const sampleUser = {
      email: "admin@example.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      token: "fake-jwt-token",
    };
  
    if (userData.email === sampleUser.email && userData.password === sampleUser.password) {
      localStorage.setItem("user", JSON.stringify(sampleUser));
      return sampleUser;
    } else {
      throw new Error("Thông tin đăng nhập không hợp lệ!");
    }
  };
const getOrders = async () => {
    const response = await axios.get(`${base_url}user/getallorders`, config);
  
    return response.data;
};
const getOrder = async (id) => {
    const response = await axios.get(
      `${base_url}user/getorderbyid/${id}`,
      config
    );
  
    return response.data;
};

const getMonthlyOrders = async () => {
    const response = await axios.get(
        `${base_url}user/getMonthWiseOrderIncome`, 
        config
    );
    
    return response.data;
}
const getYearlyStats = async () => {
    const response = await axios.get(
        `${base_url}user/getYearlyTotalOrders`, 
        config
    );
    
    return response.data;
}
const updateOrder = async (data) => {
    const response = await axios.put(
        `${base_url}user/updateorder-status/${data.id}`,
        {status: data.status},
        config
      );
      return response.data;
}
const authService = {
    login,
    getOrders,
    getOrder,
    updateOrder,
    getMonthlyOrders,
    getYearlyStats
};

export default authService;
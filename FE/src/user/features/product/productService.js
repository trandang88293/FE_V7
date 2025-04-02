import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from "../../utils/axiosconfig";

// Dữ liệu mẫu
const sampleProducts = [
    {
        _id: "1",
        title: "Điện thoại iPhone 15 Pro Max",
        brand: "Apple",
        totalrating: 4.5,
        price: 29990000,
        description: "Màn hình Super Retina XDR 6.7 inch, chip A17 Pro, camera 48MP.",
        images: [
            { url: "/images/iphone1.jpg" },
            { url: "/images/iphone2.jpg" }
        ]
    },
    {
        _id: "2",
        title: "Samsung Galaxy S23 Ultra",
        brand: "Samsung",
        totalrating: 4.8,
        price: 26990000,
        description: "Màn hình Dynamic AMOLED 6.8 inch, chip Snapdragon 8 Gen 2, camera 200MP.",
        images: [
            { url: "/images/s23ultra1.jpg" },
            { url: "/images/s23ultra2.jpg" }
        ]
    }
];

// Giả lập API với dữ liệu mẫu
const getProducts = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (data?.brand) {
                resolve(sampleProducts.filter(p => p.brand === data.brand));
            } else {
                resolve(sampleProducts);
            }
        }, 500); // Giả lập độ trễ API
    });
};

const getProduct = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sampleProducts.find(p => p._id === id));
        }, 500);
    });
};

const addToWishlist = async (prodId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: "Đã thêm vào wishlist!", prodId });
        }, 300);
    });
};

const rateProduct = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: "Đánh giá thành công!", rating: data.rating });
        }, 300);
    });
};

export const productService = {
    getProducts,
    getProduct,
    addToWishlist,
    rateProduct
};

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState({
    username: "",
    avatar: "https://via.placeholder.com/50"
  });

  useEffect(() => {
    // Lấy thông tin user từ localStorage nếu có
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          username: parsedUser.username || "",
          avatar: parsedUser.avatar || "https://via.placeholder.com/50"
        });
      } catch (err) {
        console.error("Error parsing user info from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  if (!currentPath.startsWith("/my-profile")) return null;

  return (
    <div className="sidebar p-3">
      <div className="profile-section text-center">
        <img
          src={user.avatar}
          alt="avatar"
          className="rounded-circle"
        />
        <p className="fw-bold">{user.username}</p>
        <p className="edit-profile ">✎ Sửa Hồ Sơ</p>
      </div>
      <nav className="mt-3">
   
        <Link to="/my-profile" className="nav-link">
          👤 Tài Khoản Của Tôi
        </Link>
   
        <Link to="/my-profile/myaddress" className="nav-link">📍 Địa Chỉ</Link>
        <Link to="/my-profile/addaddress" className="nav-link">🏦 Thêm địa chỉ</Link>
        <Link to="/my-profile/reset-password" className="nav-link">🔑 Đổi Mật Khẩu</Link>
        <Link to="/my-profile/privacy" className="nav-link">🔒 Những Thiết Lập Riêng Tư</Link>
        <hr />
        <Link to="/my-profile/orders" className="nav-link">📦 Đơn Mua</Link>
        <Link to="/my-profile/voucher" className="nav-link">🎟 Kho Voucher</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

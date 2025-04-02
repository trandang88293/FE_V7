import './admin/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin components
import Dashboard from './admin/pages/Dashboard';
// import Resetpassword from './admin/pages/Account/Resetpassword';
// import Login from './admin/pages/Account/Login';
// import Forgotpassword from './admin/pages/Account/Forgotpassword';
import MainLayout from './admin/components/MainLayout';
import Enquiry from './admin/pages/List/Enquiry';
import BlogList from './admin/pages/List/BlogList';
import BlogCatList from './admin/pages/List/BlogCatList';
import OrderList from './admin/pages/List/OrderList';
import Customer from './admin/pages/List/Customer';
import ColorList from './admin/pages/List/ColorList';
import BrandList from './admin/pages/List/BrandList';
import CategoryList from './admin/pages/List/CategoryList';
import ProductList from './admin/pages/List/ProductList';
import AddBlog from './admin/pages/Add/AddBlog';
import AddBlogCategory from './admin/pages/Add/AddBlogCategory';
import AddBrand from './admin/pages/Add/AddBrand';
import AddCategory from './admin/pages/Add/AddCategory';
import AddColor from './admin/pages/Add/AddColor';
import AddProduct from './admin/pages/Add/AddProduct';
import AddCoupon from './admin/pages/Add/AddCoupon';
import ViewOrder from './admin/pages/View/ViewOrder';
import ViewEnq from './admin/pages/View/ViewEnq';
import AddAccount from "./admin/pages/Add/AddAccount";
import Employee from './admin/pages/List/Employee';
import AddEmployee from './admin/pages/Add/AddEmployee';
import './user/App.css';
import CouponForm from "./admin/pages/Add/CouponForm";
import CouponList from "./admin/pages/List/CouponList";

import Orders from "./admin/pages/List/OrderList";
import NewOrder from "./admin/pages/List/NewOrder";
import OrderDetail from "./admin/pages/List/OrderDetail";
// User components
import Layout from './user/components/Layout';
import Home from './user/pages/Home';
import Blog from './user/pages/Blog';
import SingleBlog from './user/pages/SingleBlog';
import Contact from './user/pages/Contact';
import About from './user/pages/About';
import OurStore from './user/pages/OurStore';
import CompareProduct from './user/pages/CompareProduct';
import Wishlist from './user/pages/Wishlist';
import UserLogin from './user/pages/Account/Login';
import Register from './user/pages/Account/Reigister';
import ForgotPassword from './user/pages/Account/ForgotPassword';
import UserResetPassword from './user/pages/Account/ResetPassword';
import Profile from './user/pages/Account/Profile';
import PrivacyPolicy from './user/pages/Policy/PrivacyPolicy';
import RefundPolicy from './user/pages/Policy/RefundPolicy';
import ShippingPolicy from './user/pages/Policy/ShippingPolicy';
import WarrantyPolicy from './user/pages/Policy/WarrantyPolicy';
import SingleProduct from './user/pages/SingleProduct';
import Cart from './user/pages/Cart';
import Checkout from './user/pages/Checkout';
import Order from './user/pages/Order';
import ProductDetail from './admin/pages/List/ProductDetail';

import MyAddress from './user/pages/Account/MyAddress';
import AddAddress from './user/pages/Account/AddAddress';
import VoucherList from './user/pages/Account/VoucherList';





function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path='my-profile/myaddress' element={<MyAddress />} />
          <Route path='my-profile/addaddress' element={<AddAddress />} />

          <Route path='my-profile/voucher' element={<VoucherList />} />

          <Route path='blog' element={<Blog />} />
          <Route path='blog/:id' element={<SingleBlog />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='product' element={<OurStore />} />
          <Route path='product/:id' element={<SingleProduct />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='compare-product' element={<CompareProduct />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='my-order' element={<Order />} />
          <Route path='login' element={<UserLogin />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='my-profile/reset-password' element={<UserResetPassword />} />
          <Route path='my-profile' element={<Profile />} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />
          <Route path='refund-policy' element={<RefundPolicy />} />
          <Route path='shipping-policy' element={<ShippingPolicy />} />
          <Route path='warranty-policy' element={<WarrantyPolicy />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='employee' element={<Employee />} />
          <Route path='customers' element={<Customer />} />
          <Route path='AddAccount' element={<AddAccount />} />    
          <Route path='addemployee' element={<AddEmployee />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='product-detail/:productId' element={<ProductDetail />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='category-list' element={<CategoryList />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path="orders" element={<Orders />} />
      <Route path="orders/new" element={<NewOrder />} />
      <Route path="orders/:id" element={<OrderDetail />} />          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCatList />} />
          <Route path='enquiries' element={<Enquiry />} />
          <Route path="coupons" element={<CouponList />} />
          <Route path="coupons/create" element={<CouponForm />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='category' element={<AddCategory />} />
          <Route path='color' element={<AddColor />} />
          <Route path='blog' element={<AddBlog />} />
          <Route path='blog-category' element={<AddBlogCategory />} />
          <Route path='coupon' element={<AddCoupon />} />
          <Route path='product/:productId' element={<AddProduct />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='category/:id' element={<AddCategory />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-category/:id' element={<AddBlogCategory />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='order/:id' element={<ViewOrder />} />
          <Route path='enquiries/:id' element={<ViewEnq />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

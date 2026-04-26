import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FileUpload from "./components/common/FileUpload";
import { Routes, Route } from 'react-router-dom';
import AddProduct from "./components/products/AddProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import SellerRegister from './components/Seller/SellerRegister';
import './components/common/common.css';
import SellerLayout from "./components/layout/SellerLayout";
import SellerDashboard from './pages/SellerDashboard';
import SellerProductList from './pages/SellerProductList';
import AddSellerProduct from "./components/Seller/AddSellerProduct";
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/adminDashboard';
import RegisteredSellers from './pages/RegisteredSellers';
import LoginStatistics from './pages/LoginStatistics';
import SearchResultsPage from './pages/SearchResultsPage';
import CategoryPage from './pages/CategoryPage';
import AdminBannerEditor from './pages/AdminBannerEditor';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import AddBlog from './pages/AddBlog';
import SellerBlogs from './pages/SellerBlogs';
import BlogDetail from './pages/BlogDetail';




import ForgotPassword from './pages/ForgotPassword';
import SellerForgotPassword from './pages/SellerForgotPassword';

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/seller/forgot-password" element={<SellerForgotPassword />} />

        {/* Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
           <Route path="/blog/:id" element={<BlogDetail />} />
        </Route>

        {/* Seller Layout */}
        <Route element={<SellerLayout />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/product/add" element={<AddSellerProduct />} />
          <Route path="/seller/product/list" element={<SellerProductList />} />
          <Route path="/seller/add-blog" element={<AddBlog />} />
         <Route path="/seller/blogs" element={<SellerBlogs />} />
        


        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/sellers" element={<RegisteredSellers />} />
          <Route path="/admin/logins" element={<LoginStatistics />} />
          <Route path="/admin/banner-editor" element={<AdminBannerEditor />} />
        </Route>
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;

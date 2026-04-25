import React, { useEffect, useState } from 'react';
import './header.css';
import {
  IconButton, Drawer, Typography, Button, AppBar, Toolbar, InputBase, Box
} from '@mui/material';
import { Menu as MenuIcon, ShoppingCart, Delete, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import apis from '../../utils/apis';
import httpAction from '../../utils/httpAction';
import { cartActions } from '../../store/userCart-slice';
import { authActions } from '../../store/auth-slice';
import { IMAGE_BASE_URL } from '../../utils/constants';

const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCart = useSelector((state) => state.cart);
  const cart = userCart?.cart || [];
  const total = userCart?.total || 0;
  const { isAuth, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCategories = async () => {
      const data = { url: apis().getCategoryDropdown };
      const result = await dispatch(httpAction(data));
      if (result?.status) setCategories(result?.list || []);
    };
    getCategories();
  }, [dispatch]);

  const getCardItems = async () => {
    const data = { url: apis().getUserCart };
    const result = await dispatch(httpAction(data));
    if (result?.status) dispatch(cartActions.updateCart({ cart: result.cart, total: result.grandTotal }));
  };

  const cartDrawerHandler = async (value) => {
    setOpenCart(value);
    if (value) await getCardItems();
  };

  const handleDeleteCartItem = async (cartId) => {
    const data = { url: `${apis().deleteCart}?cartId=${cartId}`, method: 'DELETE' };
    const result = await dispatch(httpAction(data));
    if (result?.status) await getCardItems();
  };

  const handleCheckout = () => {
    setOpenCart(false);
    navigate('/checkout');
  };

  const handleLogout = () => {
    dispatch(authActions.setAuth({ isAuth: false, userId: "", email: "", role: null }));
    localStorage.clear();
    navigate("/login");
  };

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
    setSidebarOpen(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  return (
    <AppBar position="sticky" elevation={0} className="header_main">
      <Toolbar className="toolbar">

        {/* ☰ Icon */}
        <IconButton onClick={() => setSidebarOpen(true)} className="menu_icon">
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography variant="h6" component={Link} to="/" className="logo">
          Dastkaran
        </Typography>

        {/* Nav links */}
        <Box className="nav_links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
        </Box>

        {/* Search bar */}
        <Box className="header_center">
          <InputBase
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="search_input"
          />
          <Button onClick={handleSearch} className="customSearchBtn">Search</Button>
        </Box>

        {/* Right: buttons + cart */}
        <Box className="header_right">
          {isAuth && role === 'seller' && (
            <Button onClick={() => navigate('/seller/dashboard')}>Dashboard</Button>
          )}
          {isAuth && role === 'admin' && (
            <Button onClick={() => navigate('/admin')}>Admin Dashboard</Button>
          )}
          {!isAuth && (
            <Button onClick={() => navigate('/login')}>Login</Button>
          )}
          {isAuth && (
            <Button color="error" onClick={handleLogout}>Logout</Button>
          )}
          {role !== 'seller' && role !== 'admin' && (
            <IconButton onClick={() => cartDrawerHandler(true)}>
              <ShoppingCart sx={{ color: 'black' }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Sidebar (Categories only) */}
      <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Categories</Typography>
            <IconButton onClick={() => setSidebarOpen(false)}><Close /></IconButton>
          </Box>
          <Box mt={2} display="flex" flexDirection="column" gap={1}>
            {categories.map((cat) => (
              <Button
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                {cat.title}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      {role !== 'seller' && role !== 'admin' && (
        <Drawer anchor='right' open={openCart} onClose={() => cartDrawerHandler(false)}>
          <div className='cart_container'>
            <Typography variant="h6" sx={{ p: 2 }}>Your Cart</Typography>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="cart_item">
                  <img
                    src={item.product?.image?.length ? `${IMAGE_BASE_URL}${item.product.image[0]}` : '/fallback.jpg'}
                    alt={item.product?.title || 'Product Image'}
                  />
                  <div className="cart_item_detail">
                    <p><strong>{item?.product?.title}</strong></p>
                    <p>Qty: {item?.quantity}</p>
                    <p>Price: Rs {item?.product?.sale_price}</p>
                    <p>Total: Rs {item?.cartTotal}</p>
                  </div>
                  <IconButton onClick={() => handleDeleteCartItem(item._id)}>
                    <Delete color="error" />
                  </IconButton>
                </div>
              ))
            ) : (
              <p style={{ padding: '10px' }}>Your cart is empty.</p>
            )}
            <div className="cart_total">
              <strong>Grand Total:</strong> Rs {total}
              <br />
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </Drawer>
      )}
    </AppBar>
  );
};

export default Header;

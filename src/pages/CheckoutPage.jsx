import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Button,
  Grid,
  Rating
} from '@mui/material';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';
import { cartActions } from '../store/userCart-slice';
import toast from 'react-hot-toast';
import { IMAGE_BASE_URL } from '../utils/constants';
import './checkout.css';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [ratings, setRatings] = useState({}); 

  const handleInputChange = (e) => {
    setBuyerInfo({
      ...buyerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (productId, value) => {
    setRatings(prev => ({
      ...prev,
      [productId]: { ...prev[productId], rating: value }
    }));
  };

  const handleCommentChange = (productId, value) => {
    setRatings(prev => ({
      ...prev,
      [productId]: { ...prev[productId], comment: value }
    }));
  };

  const submitRatings = async () => {
    for (const item of cart) {
      const { rating, comment } = ratings[item.product._id] || {};
      if (rating) {
        await dispatch(httpAction({
          url: apis().rateProduct,
          method: 'POST',
          body: {
            productId: item.product._id,
            rating,
            comment
          }
        }));
      }
    }
    toast.success('Ratings submitted successfully!');
  };

  const handleSubmit = async () => {
    const { name, email, phone, address } = buyerInfo;

    if (!name || !email || !phone || !address) {
      alert('Please fill in all buyer information.');
      return;
    }

    await submitRatings(); 

    const response = await dispatch(
      httpAction({
        url: 'http://localhost:5052/api/payment/create-checkout-session',
        method: 'POST',
        body: {
          cartItems: cart,
          customerInfo: buyerInfo,
        },
      })
    );

    if (response?.url) {
      window.location.href = response.url;
    } else {
      alert('Failed to initiate payment.');
    }
  };

  const fetchCart = useCallback(async () => {
    const result = await dispatch(httpAction({ url: apis().getUserCart }));
    if (result?.status) {
      dispatch(cartActions.updateCart({ cart: result.cart, total: result.grandTotal }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <Box className="checkout-container" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={7}>
          {cart?.length > 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Items in Cart</Typography>
                <List>
                  {cart.map((item, index) => (
                    <ListItem key={index} divider>
                      <Box display="flex" alignItems="center" width="100%" gap={2}>
                        <img
                          src={`${IMAGE_BASE_URL}${item.product.image?.[0]}`}
                          alt={item.product.title}
                          style={{ width: 60, height: 60, objectFit: 'cover' }}
                        />
                        <Box flexGrow={1}>
                          <ListItemText
                            primary={item.product.title}
                            secondary={`Qty: ${item.quantity} × Rs ${item.product.sale_price}`}
                          />
                          <Box mt={1}>
                            <Rating
                              value={ratings[item.product._id]?.rating || 0}
                              onChange={(e, newVal) =>
                                handleRatingChange(item.product._id, newVal)
                              }
                            />
                            <TextField
                              label="Comment"
                              fullWidth
                              multiline
                              rows={2}
                              value={ratings[item.product._id]?.comment || ''}
                              onChange={(e) =>
                                handleCommentChange(item.product._id, e.target.value)
                              }
                              margin="dense"
                            />
                          </Box>
                        </Box>
                        <Typography variant="subtitle1">
                          Rs {item.cartTotal}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box mt={2} display="flex" justifyContent="space-between" fontWeight="bold">
                  <Typography variant="h6">Grand Total</Typography>
                  <Typography variant="h6">Rs {total}</Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1">Your cart is empty.</Typography>
          )}
        </Grid>

        {/* Buyer Info Form */}
        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Buyer Information</Typography>
              <TextField fullWidth label="Full Name" name="name" value={buyerInfo.name} onChange={handleInputChange} margin="normal" required />
              <TextField fullWidth label="Email" name="email" value={buyerInfo.email} onChange={handleInputChange} margin="normal" required />
              <TextField fullWidth label="Phone Number" name="phone" value={buyerInfo.phone} onChange={handleInputChange} margin="normal" required />
              <TextField fullWidth label="Address" name="address" value={buyerInfo.address} onChange={handleInputChange} margin="normal" multiline rows={3} required />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import useProvideHooks from '../hooks/useProvideHooks';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import toast from 'react-hot-toast';
import { IMAGE_BASE_URL } from '../utils/constants';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch, authSlice, navigate } = useProvideHooks();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = { url: apis().getProductById + '/' + id };
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        setProduct(result.product);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const res = await dispatch(httpAction({
        url: apis().getProductRecommendations + '/' + id,
      }));
      if (res?.status) setRecommendations(res.recommendations);
    };

    if (product) fetchRecommendations();
  }, [product]);

  const addToCart = async () => {
    if (!authSlice.isAuth) return navigate("/login");

    const data = {
      url: apis().addToCart + '?productId=' + product._id,
      method: 'POST'
    };
    const result = await dispatch(httpAction(data));
    result?.status
      ? toast.success('Added to cart!')
      : toast.error('Failed to add.');
  };

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % product.image.length);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + product.image.length) % product.image.length);
  };

  if (!product) return <p style={{ padding: "2rem" }}>Loading...</p>;

  const avgRating = product.review?.length
    ? product.review.reduce((sum, r) => sum + r.rating, 0) / product.review.length
    : 0;

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-heading">{product.title}</h2>

      <div className="product-detail-main">
        <div className="product-image-wrapper">
          <img
            src={`${IMAGE_BASE_URL}${product.image[imageIndex]}`}
            alt={product.title}
          />

          {product.image.length > 1 && (
            <>
              <IconButton onClick={handlePrev} className="image-nav-button left">
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton onClick={handleNext} className="image-nav-button right">
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </div>

        <div className="product-info">
          <Typography variant="h6" className="product-price">
            Price: Rs {product.sale_price}
          </Typography>

          <Typography variant="body1" className="product-description">
            {product.detail}
          </Typography>

          {product.sizes?.length > 0 && (
            <Typography variant="body2">
              <strong>Sizes:</strong> {product.sizes.join(", ")}
            </Typography>
          )}

          {product.colors && (
            <Typography variant="body2">
              <strong>Color:</strong> {product.colors}
            </Typography>
          )}

          <div className="product-rating">
            <Rating value={avgRating} precision={0.5} readOnly />
            <span>({product.review.length || 0} reviews)</span>
          </div>

          <Button
            variant="contained"
            endIcon={<ShoppingCartCheckoutIcon />}
            onClick={addToCart}
            className="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommended-section">
          <Typography variant="h6" sx={{ marginTop: "2rem" }}>
            Recommended Products
          </Typography>
          <div className="recommendation-list">
            {recommendations.map((rec) => (
              <div
                key={rec._id}
                className="recommended-product-card"
                onClick={() => navigate(`/product/${rec._id}`)}
              >
                <img
                  src={`${IMAGE_BASE_URL}${rec.image[0]}`}
                  alt={rec.title}
                />
                <Typography variant="body2">{rec.title}</Typography>
                <Typography variant="body2" color="primary">Rs {rec.sale_price}</Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

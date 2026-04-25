import React, { useEffect, useState } from 'react';
import {
  Button,
  Rating,
  Typography,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useProvideHooks from '../../hooks/useProvideHooks';
import httpAction from '../../utils/httpAction';
import apis from "../../utils/apis";
import toast from 'react-hot-toast';
import { IMAGE_BASE_URL } from '../../utils/constants';

const isLightColor = (color) => {
  const lightColors = ['white', 'snow', 'ivory', 'beige', 'floralwhite', 'ghostwhite', 'honeydew', 'mintcream'];
  return lightColors.includes(color.toLowerCase());
};

const ClientSingleProduct = ({ item }) => {
  const { authSlice, navigate, dispatch } = useProvideHooks();
  const { isAuth } = authSlice;

  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (item?.review?.length) {
      const ratings = item.review.map(r => r.rating);
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      setAverageRating(avg);
      setRatingCount(ratings.length);
    }
  }, [item]);

  const addToCart = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const data = {
      url: apis().addToCart + '?productId=' + item?._id,
      method: 'POST',
    };

    const result = await dispatch(httpAction(data));
    result?.status
      ? toast.success('Item added to cart!')
      : toast.error('Failed to add item to cart.');
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev + 1 >= item.image.length ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev - 1 < 0 ? item.image.length - 1 : prev - 1
    );
  };

  const goToDetail = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <div
      className="client_single_product"
      style={{ cursor: 'pointer' }}
      onClick={goToDetail}
    >
      <div className="client_product_image_wrapper">
        <div className="price_badge">Rs {item?.sale_price || item?.purchase_price || 'N/A'}</div>
        <div className="client_product_image" style={{ position: 'relative' }}>
          {item?.image?.length > 0 ? (
            <>
              <img
                src={`${IMAGE_BASE_URL}${item.image[currentImageIndex]}`}
                alt={item.title}
                onError={(e) => { e.target.src = "/images/fallback-image.jpg" }}
              />
              {item.image.length > 1 && (
                <>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    style={{ position: 'absolute', top: '50%', left: 0, color: '#fff' }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    style={{ position: 'absolute', top: '50%', right: 0, color: '#fff' }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </>
              )}
            </>
          ) : (
            <img src="/images/fallback-image.jpg" alt="No image" />
          )}
        </div>
      </div>

      <div className="client_product_content">
        <span className="single_product_title">{item?.title}</span>

        {}
        {item.sizes?.length > 0 && (
          <Typography variant="body2" sx={{ color: "#666" }}>
            <strong>Sizes:</strong>{" "}
            {Array.isArray(item.sizes) ? item.sizes.join(", ") : item.sizes}
          </Typography>
        )}

        {}
        {item.colors?.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '0.9rem' }}>Colors:</strong>
            <Stack direction="row" spacing={1} sx={{ marginTop: '0.4rem', flexWrap: 'wrap' }}>
              {(Array.isArray(item.colors) ? item.colors : [item.colors]).map((color, idx) => (
                <Chip
                  key={idx}
                  label={color}
                  size="small"
                  sx={{
                    backgroundColor: color.toLowerCase(),
                    color: isLightColor(color) ? '#000' : '#fff',
                    border: isLightColor(color) ? '1px solid #aaa' : 'none',
                    borderRadius: '4px',
                    textTransform: 'capitalize'
                  }}
                />
              ))}
            </Stack>
          </div>
        )}

        {}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          <Rating value={averageRating} precision={0.5} readOnly />
          <Typography variant="caption" color="text.secondary">
            ({ratingCount})
          </Typography>
        </div>

        <Button
          onClick={(e) => { e.stopPropagation(); addToCart(); }}
          variant="contained"
          endIcon={<ShoppingCartCheckoutIcon />}
          sx={{
            backgroundColor: '#a50000',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '140px',
            alignSelf: 'center',
            mt: 1.5
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ClientSingleProduct;

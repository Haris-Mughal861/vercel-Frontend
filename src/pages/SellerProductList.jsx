import React, { useEffect, useState } from 'react';
import './SellerDashboard.css';
import useProvideHooks from '../hooks/useProvideHooks';
import { IMAGE_BASE_URL } from '../utils/constants';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';

const SellerDashboard = () => {
  const { dispatch } = useProvideHooks();
  const [products, setProducts] = useState([]);

  const fetchSellerProducts = async () => {
    const data = { url: apis().sellerDashboard };
    const result = await dispatch(httpAction(data));

    console.log("Seller Products:", result);
    if (result?.status) {
      setProducts(result.products);
    }
  };

  const deleteProduct = async (productId) => {
    const data = {
      url: `${apis().deleteProduct}/${productId}`,


      method: 'DELETE',
    };

    const result = await dispatch(httpAction(data));
    if (result?.status) {
      
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted");
    } else {
      alert(result?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [dispatch]);

  return (
    <div className="seller_dashboard_main">
      <h2>Your Listed Products</h2>
      <div className="dashboard_product_grid">
        {products.map((product) => (
          <div key={product._id} className="dashboard_product_card">
            <img
              src={`${IMAGE_BASE_URL}${product.image?.[0]}`}
              alt={product.title}
              className="dashboard_product_image"
            />
            <h4>{product.title}</h4>
            <p>Price: Rs {product.sale_price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => deleteProduct(product._id)} className="delete_btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;



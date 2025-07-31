import React, { useEffect, useState } from 'react';
import useProvideHooks from '../hooks/useProvideHooks';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const { dispatch } = useProvideHooks();
  const [products, setProducts] = useState([]);

  const fetchSellerProducts = async () => {
    const data = { url: apis().sellerDashboard };
    const result = await dispatch(httpAction(data));
    if (result?.status) setProducts(result.products);
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
  }, []);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValue = products.reduce((sum, p) => sum + (p.sale_price * p.stock), 0);

  return (
    <div className="seller_dashboard_main">
      <h2>Seller Dashboard</h2>

      <div className="dashboard_stats">
        <div className="stat_card">
          <h3>{totalProducts}</h3>
          <p>Total Products</p>
        </div>
        <div className="stat_card">
          <h3>{totalStock}</h3>
          <p>Total Stock</p>
        </div>
        <div className="stat_card">
          <h3>Rs {totalValue}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Your Products</h3>
      <div className="dashboard_product_grid">
        {products.map((product) => (
          <div key={product._id} className="dashboard_product_card">
            <img
              src={`http://localhost:5052/images/${product.image?.[0]}`}
              alt={product.title}
              className="dashboard_product_image"
            />
            <div className="dashboard_product_info">
              <h4>{product.title}</h4>
              <p>Price: Rs {product.sale_price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => deleteProduct(product._id)} className="delete_btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import ClientSingleProduct from '../components/products/ClientSingleProduct';
import './categoryPage.css'; 

const CategoryPage = () => {
  const { id: categoryId } = useParams(); 
  const { dispatch } = useProvideHooks();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const data = { url: apis().getProductsByCategory(categoryId) };
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        setProducts(result.list || []);
      }
    };

    fetchCategoryProducts();
  }, [categoryId, dispatch]);

  return (
    <div className="category_page_container">
      <h2>Products in this Category</h2>
      <div className="category_product_list">
        {products.length > 0 ? (
          products.map((product) => (
           <ClientSingleProduct key={product._id} item={product} />

          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

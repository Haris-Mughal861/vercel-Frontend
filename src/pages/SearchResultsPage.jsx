import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import ClientSingleProduct from '../components/products/ClientSingleProduct';

const SearchResultsPage = () => {
  const { dispatch } = useProvideHooks();
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      const data = { url: apis().getProductSearch(query) };
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        setProducts(result.list);
      }
    };
    fetchSearchResults();
  }, [query, dispatch]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Results for "{query}"</h2>
      <div className="category_product_list">
        {products.length > 0 ? (
          products.map((product) => (
            <ClientSingleProduct key={product._id} item={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

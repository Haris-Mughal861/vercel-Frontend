import React, { useEffect, useState } from 'react';
import './clientProductList.css';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
import useProvideHooks from '../../hooks/useProvideHooks';
import ClientSingleProduct from './ClientSingleProduct';

const INITIAL_LIMIT = 15;
const LOAD_MORE_LIMIT = 10;

const ClientProductList = () => {
  const { dispatch, loading, setLoading } = useProvideHooks();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const loadMoreHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const limit = page === 1 ? INITIAL_LIMIT : LOAD_MORE_LIMIT;

      const data = {
        url: `${apis().getAllProducts}?page=${page}&limit=${limit}`,
      };

      const result = await dispatch(httpAction(data));

      if (result?.status) {
        setProducts((prevProducts) => [...prevProducts, ...result.list]);
        setCount(result.productCount);
      }

      setLoading(false);
    };

    getProducts();
  }, [dispatch, page, setLoading]);

  if (loading && products.length === 0) {
    return <div className="client_product_loading">Loading...</div>;
  }

  return (
    <div className="client_product_main">
      <span className="section_title">Our Featured Products</span>
      <div className="client_product_container">
        {products.length > 0 ? (
          products.map((item) => (
            <ClientSingleProduct key={item._id} item={item} />
          ))
        ) : (
          <div className="client_product_empty">No products available</div>
        )}
      </div>
      <div className="client_product_pagination">
        {count > products.length && (
          <Button onClick={loadMoreHandler} endIcon={<RefreshIcon />} variant="outlined">
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientProductList;

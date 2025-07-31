import React, { useEffect, useState } from 'react';
import './Brand.css';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
import useProvideHooks from '../../hooks/useProvideHooks';

const Brand = () => {
  const { dispatch } = useProvideHooks();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getBrands = async () => {
      const data = { url: apis().getBrandDropdown };
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        setBrands(result?.list);
      }
    };
    getBrands();
  }, [dispatch]);

  return (
    <div className="brands_main">
      <h2 className="section_title">Our Trusted Brands</h2>
      <div className="brands_container">
        {brands?.map((item, index) => (
          <div className="brand_card" key={index}>
            <img src={item?.image} alt={item?.title} className="brand_logo" />
            <div className="brand_name">{item?.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;


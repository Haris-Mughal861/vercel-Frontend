import React, { useEffect, useState } from 'react';
import './categories.css';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
import useProvideHooks from '../../hooks/useProvideHooks';

const Categories = () => {
  const { dispatch } = useProvideHooks();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = { url: apis().getCategoryDropdown };
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        setCategories(result?.list);
      }
    };
    getCategories();
  }, [dispatch]);

  return (
    <div className='categories_main'>
      <div className='section_title_with_button'>
        <span className='section_title'>Shop by Categories</span>
      </div>
      <div className='cat_container'>
        {categories?.map((item, index) => (
          <div key={index} className='cat_card'>
            <div className='cat_image_wrapper'>
              <img src={item?.image} alt={item?.title} className='cat_image' />
            </div>
            <span className='cat_title'>{item?.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;


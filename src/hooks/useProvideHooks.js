import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{useNavigate} from 'react-router-dom'

const useProvideHooks = () => {
  const authSlice = useSelector(state=>state.auth)
  const userCart = useSelector(state=>state.cart.cart)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return {
    loading, 
    setLoading, 
    dispatch, 
    navigate,
    authSlice,
    userCart,
  };
};

export default useProvideHooks;

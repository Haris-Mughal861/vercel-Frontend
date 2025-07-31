import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import apis from '../../utils/apis';
import httpAction from '../../utils/httpAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './sellerRegister.css';
import toast from 'react-hot-toast';

const SellerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    code: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendCode = async () => {
    if (!form.email) return toast.error("Enter your email first");
    const data = {
      url: apis().requestSellerCode,
      method: "POST",
      body: { email: form.email },
    };

    const result = await dispatch(httpAction(data));
    if (result?.status) toast.success("Verification code sent to your email");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      url: apis().verifySellerAndRegister,
      method: 'POST',
      body: form,
    };

    try {
      const result = await dispatch(httpAction(data));
      if (result?.status) {
        toast.success("Seller registered successfully");
        navigate('/');
      } else {
        toast.error(result?.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="auth_main">
      <Paper elevation={4} className="auth_card">
        <div className="auth_header">
          <Typography variant="h5" fontWeight="bold">Create Seller Account</Typography>
          <Typography variant="body2" color="textSecondary">Register to start selling</Typography>
        </div>

        <form onSubmit={handleSubmit} className="auth_container">
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mt: 3 }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mt: 3 }}
          />

          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            onClick={handleSendCode}
          >
            Send Code
          </Button>

          <TextField
            label="Verification Code"
            name="code"
            value={form.code}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mt: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <div className="auth_options">
            <Typography variant="body2" sx={{ mt: 1 }}>
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default SellerRegister;

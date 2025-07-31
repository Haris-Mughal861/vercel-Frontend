import React from 'react';
import './auth.css';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import httpAction from '../../utils/httpAction';
import toast from 'react-hot-toast';
import useProvideHooks from '../../hooks/useProvideHooks';
import apis from "../../utils/apis";

const Register = () => {
  const { loading, setLoading, dispatch, navigate } = useProvideHooks();

  const initialValue = {
    name: '',
    email: '',
    password: '',
    code: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().trim().required('Password is required'),
    code: Yup.string().trim().required('Verification code is required'),
  });

  const handleSendCode = async (email) => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }
    const data = {
      url: apis().requestUserCode,
      method: "POST",
      body: { email },
    };

    const result = await dispatch(httpAction(data));
    if (result?.status) {
      toast.success("Verification code sent to your email");
    }
  };

  const submitHandler = async (values) => {
    const data = {
      url: apis().verifyUserAndRegister,
      method: "POST",
      body: { ...values },
    };

    setLoading(true);
    try {
      const result = await dispatch(httpAction(data));
      setLoading(false);

      if (result?.status) {
        toast.success(result?.message);
        navigate('/login');
      } else {
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="auth_main">
      <Paper elevation={4} className="auth_card">
        <div className="auth_header">
          <Typography variant="h5" fontWeight="bold">Create Account</Typography>
          <Typography variant="body2" color="textSecondary">Register as a normal user</Typography>
        </div>

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ handleBlur, touched, handleChange, errors, values }) => (
            <Form className="auth_container">
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                name="name"
                label="Full Name"
                type="text"
                size="small"
                fullWidth
                sx={{ mt: 3 }}
              />

              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                name="email"
                label="Email"
                type="email"
                size="small"
                fullWidth
                sx={{ mt: 3 }}
              />

              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => handleSendCode(values.email)}
              >
                Send Code
              </Button>

              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
                name="code"
                label="Verification Code"
                type="text"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              />

              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                name="password"
                label="Password"
                type="password"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              />

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                {loading ? 'Loading...' : 'Register'}
              </Button>

              <div className="auth_options">
                <Link to="/login">Already have an account?</Link>
                <Link to="/seller/register" style={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Sign up as a Seller?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default Register;

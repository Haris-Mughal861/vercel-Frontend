import React from 'react';
import './auth.css';
import { Formik, Form } from 'formik';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import httpAction from '../../utils/httpAction';
import apis from '../../utils/apis';
import useProvideHooks from '../../hooks/useProvideHooks';
import toast from 'react-hot-toast';
import { authActions } from '../../store/auth-slice';

function Login() {
  const { dispatch, loading, setLoading, navigate } = useProvideHooks();

  const initialValue = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim().required('Email is required'),
    password: Yup.string().trim().required('Password is required'),
  });

  const submitHandler = async (values) => {
    if (!values.email || !values.password) {
      toast.error("All fields are required");
      return;
    }

    const data = {
      url: apis().loginUser,
      method: 'POST',
      body: { ...values },
    };

    setLoading(true);
    const result = await dispatch(httpAction(data));
    setLoading(false);

    if (result?.status) {
      toast.success(result?.message);

      localStorage.setItem("role", result?.user?.role);
      localStorage.setItem("userId", result?.user?.userId);
      localStorage.setItem("email", result?.user?.email);

      dispatch(authActions.setAuth({
        isAuth: true,
        userId: result?.user?.userId,
        email: result?.user?.email,
        role: result?.user?.role
      }));

      if (result.user.role === "seller") navigate("/seller/dashboard");
      if (result.user.role === "user") navigate("/");
      if (result.user.role === "admin") navigate("/admin/dashboard");
    }
  };

  return (
    <div className="auth_main">
      <Paper elevation={4} className="auth_card">
        <div className="auth_header">
          <Typography variant="h5" fontWeight="bold">Welcome Back</Typography>
          <Typography variant="body2" color="textSecondary">Login to continue</Typography>
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
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                name="email"
                label="Email"
                type="email"
                size="small"
                fullWidth
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
                {loading ? 'Please wait...' : 'Login'}
              </Button>

              <div className="auth_options">
                <Link to="/forgot-password">Forgot password?</Link><br />
                <Link to="/seller/forgot-password">Seller forgot password?</Link><br />
                <Link to="/register">Create a new account?</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}

export default Login;

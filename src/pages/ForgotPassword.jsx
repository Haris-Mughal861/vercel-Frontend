// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [codeSent, setCodeSent] = useState(false);
  const { dispatch } = useProvideHooks();
  const navigate = useNavigate();

  const sendCode = async (email) => {
    const data = {
      url: apis().userRequestResetCode,
      method: 'POST',
      body: { email }
    };
    const res = await dispatch(httpAction(data));
    if (res?.status) {
      setCodeSent(true);
      toast.success("Reset code sent to your email");
    }
  };

  const resetPassword = async (values) => {
    console.log("🧪 Reset request:", values);
    const data = {
      url: apis().userResetPassword, 
      method: 'POST',
      body: {
        email: values.email.toLowerCase(),
        code: values.code,
        password: values.password
      }
    };
    const res = await dispatch(httpAction(data));
    if (res?.status) {
      toast.success("Password reset successfully");
      navigate('/login');
    }
  };

  return (
    <div className="auth_main">
      <Paper elevation={4} className="auth_card">
        <Typography variant="h5" fontWeight="bold">Forgot Password</Typography>

        <Formik
          initialValues={{ email: '', code: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            code: codeSent ? Yup.string().required('Enter the code') : Yup.string(),
            password: codeSent ? Yup.string().min(6, 'Min 6 characters').required('Required') : Yup.string()
          })}
          onSubmit={(values) => {
            console.log("📤 Form submitted with:", values);
            if (!codeSent) {
              sendCode(values.email);
            } else {
              resetPassword(values);
            }
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="auth_container">
              <TextField
                label="Email"
                name="email"
                fullWidth
                size="small"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mt: 2 }}
              />

              {codeSent && (
                <>
                  <TextField
                    label="Verification Code"
                    name="code"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                    error={touched.code && Boolean(errors.code)}
                    helperText={touched.code && errors.code}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="New Password"
                    name="password"
                    type="password"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ mt: 2 }}
                  />
                </>
              )}

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                {codeSent ? "Reset Password" : "Send Code"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import CustomModel from '../components/common/CustomModel';
import './admindashboard.css';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const dispatch = useDispatch();

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      image: Yup.mixed().nullable(), 
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.image) {
        formData.append('image', values.image); 
      }

    
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const data = {
        url:
          modalType === 'brand'
            ? apis().addNewBrand
            : apis().addNewCategory,
        method: 'POST',
        isFormData: true, 
        body: formData,
      };

      const res = await dispatch(httpAction(data));
      if (res?.status) {
        resetForm();
        setShowModal(false);
      }
    },
  });

  return (
    <div className="admin-dashboard-container">
      <div className="sidebar-toggle">
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>

      <h2>Admin Dashboard</h2>

      <ul>
        <li>👥 <a href="/admin/sellers">Registered Sellers</a></li>
        <li>📊 <a href="/admin/logins">Login Statistics</a></li>
        <li>🖼️ <a href="/admin/banner-editor">Edit Homepage Banner</a></li>
      </ul>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Button variant="outlined" onClick={() => openModal('brand')}>
          ➕ Add Brand
        </Button>
        <Button variant="outlined" onClick={() => openModal('category')}>
          ➕ Add Category
        </Button>
      </div>

      {/* Modal */}
      <CustomModel
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Add New ${modalType}`}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />
          <input
            type="file"
            name="image"
            onChange={(e) =>
              formik.setFieldValue('image', e.currentTarget.files[0])
            }
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </CustomModel>
    </div>
  );
};

export default AdminDashboard;

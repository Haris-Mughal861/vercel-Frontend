import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';
import useProvideHooks from '../hooks/useProvideHooks';

const AddBlog = () => {
  const { dispatch } = useProvideHooks();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    image: null,
  });

  const [blogExists, setBlogExists] = useState(false);

  useEffect(() => {
    const checkBlogExists = async () => {
      const res = await dispatch(httpAction({ url: apis().getMyBlog }));
      if (res?.exists) {
        setBlogExists(true);
      }
    };
    checkBlogExists();
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.summary || !form.content || !form.image) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('summary', form.summary);
    formData.append('content', form.content);
    formData.append('image', form.image);

    const data = {
      url: apis().sellerAddBlog,
      method: 'POST',
      body: formData,
      isFormData: true
    };

    const result = await dispatch(httpAction(data));
    if (result?.status) {
      toast.success("Blog added successfully");
      navigate('/blog');
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, maxWidth: 700, margin: '1rem auto' }}>
      {blogExists ? (
        <>
          <Typography variant="h5" mb={2}>You have already created a blog</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Each seller is allowed to post only one blog.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/seller/blogs')}>
            View My Blog
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" mb={2}>Add New Blog</Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Title"
              name="title"
              fullWidth
              size="small"
              value={form.title}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Summary"
              name="summary"
              fullWidth
              size="small"
              value={form.summary}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              name="content"
              fullWidth
              size="small"
              multiline
              minRows={4}
              value={form.content}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mb: 2 }}
            >
              Upload Blog Image
              <input hidden accept="image/*" type="file" onChange={handleImage} />
            </Button>
            <br />
            <Button type="submit" variant="contained">Submit Blog</Button>
          </form>
        </>
      )}
    </Paper>
  );
};

export default AddBlog;

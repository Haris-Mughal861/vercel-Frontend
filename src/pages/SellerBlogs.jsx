import React, { useEffect, useState, useCallback } from 'react';
import { Typography, Button, Paper } from '@mui/material';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import toast from 'react-hot-toast';
import { IMAGE_BASE_URL } from '../utils/constants';

const SellerBlogs = () => {
  const { dispatch } = useProvideHooks();
  const [blog, setBlog] = useState(null);

  const fetchSellerBlog = useCallback(async () => {
    const res = await dispatch(httpAction({ url: apis().getMyBlog }));
    if (res?.exists) {
      setBlog(res.blog);
    }
  }, [dispatch]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const res = await dispatch(httpAction({
      url: apis().deleteSellerBlog(blog._id),
      method: 'DELETE'
    }));

    if (res?.status) {
      toast.success("Blog deleted successfully");
      setBlog(null);
    } else {
      toast.error(res?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchSellerBlog();
  }, [fetchSellerBlog]);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <Typography variant="h4" gutterBottom>My Blog</Typography>

      {!blog ? (
        <Typography>No blog found. You can add one from the sidebar.</Typography>
      ) : (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <img
            src={`${IMAGE_BASE_URL}${blog.image}`}
            alt={blog.title}
            style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
          />
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {blog.summary}
          </Typography>
          <Typography variant="body1" paragraph>
            {blog.content}
          </Typography>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Blog
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default SellerBlogs;

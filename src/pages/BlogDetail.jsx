import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import { Typography, Paper } from '@mui/material';
import useProvideHooks from '../hooks/useProvideHooks';
import { IMAGE_BASE_URL } from '../utils/constants';

const BlogDetail = () => {
  const { id } = useParams();
  const { dispatch } = useProvideHooks();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await dispatch(httpAction({ url: `${apis().getBlogs}/${id}` }));
      if (res?.status) setBlog(res.blog);
    };
    fetchBlog();
  }, [id, dispatch]);

  if (!blog) return <Typography>Loading blog...</Typography>;

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: '2rem auto' }}>
      <img
        src={`${IMAGE_BASE_URL}${blog.image}`}
        alt={blog.title}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <Typography variant="h4">{blog.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {blog.summary}
      </Typography>
      <Typography variant="body1">{blog.content}</Typography>
    </Paper>
  );
};

export default BlogDetail;

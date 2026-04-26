import React, { useEffect, useState, useCallback } from 'react';
import './blog.css';
import { Typography, Button } from '@mui/material';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';
import useProvideHooks from '../hooks/useProvideHooks';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../utils/constants';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { dispatch } = useProvideHooks();
  const navigate = useNavigate();

  const fetchBlogs = useCallback(async () => {
    const res = await dispatch(httpAction({ url: apis().getBlogs }));
    if (res?.status) {
      setBlogs(res.blogs);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="blog_page">
      <Typography variant="h4" className="blog_heading">Stories of Our Artisans</Typography>
      <div className="blog_list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog_card">
            <img
              src={`${IMAGE_BASE_URL}${blog.image}`}
              alt={blog.title}
              className="blog_image"
            />
            <div className="blog_content_container">
              <Typography variant="h6" className="blog_title">{blog.title}</Typography>
              <Typography variant="body2" className="blog_summary">{blog.summary}</Typography>
              <Button
                variant="outlined"
                size="small"
                className="read_more_btn"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

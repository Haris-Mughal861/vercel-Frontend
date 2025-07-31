import React from 'react';
import './contact.css';
import { Typography, TextField, Button, Box } from '@mui/material';

const ContactPage = () => {
  return (
    <Box className="contact-container">
      <Typography variant="h4" gutterBottom>Contact Us</Typography>

      <Typography variant="body1" gutterBottom>
        Feel free to reach out with any questions or concerns. We'll get back to you as soon as possible.
      </Typography>

      <form className="contact-form">
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Your Email"
          variant="outlined"
          margin="normal"
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Your Message"
          variant="outlined"
          margin="normal"
          multiline
          rows={5}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default ContactPage;

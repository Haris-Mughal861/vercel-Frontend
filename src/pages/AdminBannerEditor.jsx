import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import FileUpload from '../components/common/FileUpload';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import toast from 'react-hot-toast';

const AdminBannerEditor = () => {
  const [banner, setBanner] = useState(null);
  const [files, setFiles] = useState([]);
  const [formValues, setFormValues] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: ''
  });

  const getBanner = async () => {
    const result = await httpAction({ url: apis().getBanner })();
    if (result?.status && result.banner) {
      setBanner(result.banner);
      setFormValues({
        title: result.banner.title || '',
        subtitle: result.banner.subtitle || '',
        buttonText: result.banner.buttonText || '',
        buttonLink: result.banner.buttonLink || ''
      });
    } else {
      
      setBanner(null);
      setFormValues({
        title: '',
        subtitle: '',
        buttonText: '',
        buttonLink: ''
      });
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('subtitle', formValues.subtitle);
    formData.append('buttonText', formValues.buttonText);
    formData.append('buttonLink', formValues.buttonLink);
    if (files.length > 0) {
      formData.append('image', files[0]);
    }

    const result = await httpAction({
      url: apis().updateBanner,
      method: 'POST',
      body: formData,
      isFormData: true
    })();

    if (result?.status) {
      toast.success("Banner updated!");
      getBanner();
      setFiles([]);
    } else {
      toast.error("Banner update failed");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Update Homepage Banner</h2>
      <TextField
        label="Title"
        name="title"
        value={formValues.title}
        onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Subtitle"
        name="subtitle"
        value={formValues.subtitle}
        onChange={(e) => setFormValues({ ...formValues, subtitle: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Button Text"
        name="buttonText"
        value={formValues.buttonText}
        onChange={(e) => setFormValues({ ...formValues, buttonText: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Button Link"
        name="buttonLink"
        value={formValues.buttonLink}
        onChange={(e) => setFormValues({ ...formValues, buttonLink: e.target.value })}
        fullWidth
        margin="normal"
      />
      <FileUpload files={files} setFiles={setFiles} />
      <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
        Update Banner
      </Button>
    </div>
  );
};

export default AdminBannerEditor;

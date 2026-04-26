import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextField, Autocomplete, Button, Card } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import apis from "../../utils/apis";
import useProvideHooks from "../../hooks/useProvideHooks";
import toast from "react-hot-toast";
import FileUpload from "../common/FileUpload";
import httpAction from "../../utils/httpAction";

const AddSellerProduct = () => {
  const { dispatch, loading, navigate, setLoading } = useProvideHooks();
  const [files, setFiles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const shoeSizes = ["6", "7", "8", "9", "10", "11", "12"];

  const initialState = {
    title: "",
    sale_price: "",
    purchase_price: "",
    stock: "",
    detail: "",
    brand: "",
    category: "",
    sizes: [],
    colors: ""
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    sale_price: Yup.number().required("Sale price is required"),
    purchase_price: Yup.number().required("Purchase price is required"),
    stock: Yup.number().required("Stock is required"),
    detail: Yup.string().required("Detail is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    sizes: Yup.array().of(Yup.string()),
    colors: Yup.string()
  });

  const submitHandler = async (values) => {
    const formData = new FormData();

    const productData = {
      ...values,
      sizes: values.sizes.join(",")
    };

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    files.forEach((file) => {
      formData.append("image", file);
    });

    const data = {
      url: apis().addProduct,
      method: "POST",
      body: formData,
      isFormData: true,
    };

    setLoading(true);
    const result = await dispatch(httpAction(data));
    setLoading(false);

    if (result?.status) {
      toast.success(result?.message);
      navigate("/seller/dashboard");
    } else {
      toast.error(result?.message || "Failed to add product");
    }
  };

  useEffect(() => {
    const getDropdowns = async () => {
      const brandRes = await dispatch(httpAction({ url: apis().getBrandDropdown }));
      if (brandRes?.status) {
        setBrands(brandRes.list?.map((item) => item.title));
      }

      const catRes = await dispatch(httpAction({ url: apis().getCategoryDropdown }));
      if (catRes?.status) {
        setCategories(catRes.list?.map((item) => item.title));
      }
    };

    getDropdowns();
  }, [dispatch]);

  return (
    <div className="add_product_main">
      <Card sx={{ padding: "2rem" }}>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ handleChange, handleBlur, touched, errors, values, setFieldValue }) => (
            <Form>
              <div className="row g-3">

                {}
                <div className="col-md-12">
                  <TextField
                    fullWidth size="small" name="title" label="Product Title"
                    onChange={handleChange} onBlur={handleBlur} value={values.title}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </div>

                {}
                <div className="col-md-4">
                  <TextField
                    fullWidth size="small" name="sale_price" label="Sale Price" type="number"
                    onChange={handleChange} onBlur={handleBlur} value={values.sale_price}
                    error={touched.sale_price && Boolean(errors.sale_price)}
                    helperText={touched.sale_price && errors.sale_price}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    fullWidth size="small" name="purchase_price" label="Purchase Price" type="number"
                    onChange={handleChange} onBlur={handleBlur} value={values.purchase_price}
                    error={touched.purchase_price && Boolean(errors.purchase_price)}
                    helperText={touched.purchase_price && errors.purchase_price}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    fullWidth size="small" name="stock" label="Stock" type="number"
                    onChange={handleChange} onBlur={handleBlur} value={values.stock}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                  />
                </div>

                {}
                <div className="row g-3">
                  <div className="col-md-6">
                    <textarea
                      className="add_product_detail"
                      name="detail"
                      rows={5}
                      placeholder="Enter product details..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.detail}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderColor: touched.detail && errors.detail ? "red" : "#ccc",
                      }}
                    />
                    <span style={{ color: "red" }}>{touched.detail && errors.detail}</span>
                  </div>
                  <div className="col-md-6">
                    <FileUpload files={files} setFiles={setFiles} />
                  </div>
                </div>

                {}
                <div className="row g-3">
                  <div className="col-md-6">
                    <Autocomplete
                      multiple
                      options={shoeSizes}
                      value={values.sizes}
                      onChange={(event, newValue) => setFieldValue("sizes", newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="sizes"
                          label="Select Sizes"
                          size="small"
                          placeholder="Select one or more sizes"
                        />
                      )}
                    />
                  </div>

                  <div className="col-md-6">
                    <TextField
                      fullWidth size="small" name="colors" label="Color (Optional)"
                      onChange={handleChange} onBlur={handleBlur} value={values.colors}
                      error={touched.colors && Boolean(errors.colors)}
                      helperText={touched.colors && errors.colors}
                    />
                  </div>
                </div>

                {}
                <div className="col-md-6">
                  <Autocomplete
                    options={brands}
                    value={values.brand}
                    onChange={(e, newValue) => setFieldValue("brand", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params} name="brand" label="Select Brand" onBlur={handleBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                        size="small" fullWidth
                      />
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <Autocomplete
                    options={categories}
                    value={values.category}
                    onChange={(e, newValue) => setFieldValue("category", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params} name="category" label="Select Category" onBlur={handleBlur}
                        error={touched.category && Boolean(errors.category)}
                        helperText={touched.category && errors.category}
                        size="small" fullWidth
                      />
                    )}
                  />
                </div>

                {}
                <div className="add_product_actions" style={{ marginTop: '1.5rem' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SaveIcon />}
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Save Product"}
                  </Button>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default AddSellerProduct;

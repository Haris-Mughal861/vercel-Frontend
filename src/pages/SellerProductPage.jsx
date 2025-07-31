import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextField, Autocomplete, Button, Card } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import apis from "../utils/apis";
import useProvideHooks from "../hooks/useProvideHooks";
import toast from "react-hot-toast";
import FileUpload from "../components/common/FileUpload";
import CustomModel from "../components/common/CustomModel";
import httpAction from "../utils/httpAction";

const AddSellerProduct = () => {
  const { dispatch, loading, navigate, setLoading } = useProvideHooks();
  const [files, setFiles] = useState([]);
  const [shoeModel, setShowModel] = useState(false);
  const [modelFile, setModelFile] = useState([]);
  const [modelTitle, setModelTitle] = useState("");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const closeModel = () => setShowModel(false);


  const initistate = {
    title: "",
    sale_price: "",
    purchase_price: "",
    stock: "",
    detail: "",
    brand: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    sale_price: Yup.number().required("Sale price is required"),
    purchase_price: Yup.number().required("Purchase price is required"),
    stock: Yup.number().required("Stock is required"),
    detail: Yup.string().required("Detail is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
  });


  const submitHandler = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("sale_price", values.sale_price);
    formData.append("purchase_price", values.purchase_price);
    formData.append("stock", values.stock);
    formData.append("detail", values.detail);
    formData.append("brand", values.brand);
    formData.append("category", values.category);

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
      navigate("/admin/product/list");
    } else {
      toast.error(result?.message || "Failed to add product");
    }
  };

  const initialModelaValue = { title: "" };
  const validateModelValue = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  const sendModelValue = async (values) => {
    const formatedValues = {
      ...values,
      image: modelFile[0],
    };

    const data = {
      url: modelTitle === "brand" ? apis().addNewBrand : apis().addNewCategory,
      method: "POST",
      body: { ...formatedValues },
    };
    const result = await dispatch(httpAction(data));

    if (result?.status) {
      setShowModel(false);
      toast.success(result?.message);
      setModelFile([]);
      if (modelTitle === "brand") {
        setBrands((prev) => [...prev, result?.savedBrand?.title]);
      } else {
        setCategories((prev) => [...prev, result?.savedCategory?.title]);
      }
    }
  };

  useEffect(() => {
    const getModelDropdown = async () => {
      const brandRes = await dispatch(httpAction({ url: apis().getBrandDropdown }));
      if (brandRes?.status) {
        const values = brandRes?.list?.map((item) => item.title);
        setBrands(values);
      }

      const catRes = await dispatch(httpAction({ url: apis().getCategoryDropdown }));
      if (catRes?.status) {
        const values = catRes?.list?.map((item) => item.title);
        setCategories(values);
      }
    };

    getModelDropdown();
  }, []);

  return (
    <div className="add_product_main">
      <Card sx={{ padding: "2rem" }}>
        <CustomModel show={shoeModel} onClose={closeModel} title={`add new ${modelTitle}`}>
          <Formik
            onSubmit={sendModelValue}
            initialValues={initialModelaValue}
            validationSchema={validateModelValue}
          >
            {({ handleBlur, handleChange, values, errors, touched }) => (
              <Form>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <TextField
                    name="title"
                    label={`${modelTitle} title`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    size="small"
                    fullWidth
                    value={values.title}
                  />
                  <FileUpload files={modelFile} setFiles={setModelFile} />
                  <Button type="submit" variant="contained">Save</Button>
                </div>
              </Form>
            )}
          </Formik>
        </CustomModel>

        <Formik
          initialValues={initistate}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ handleBlur, handleChange, touched, setFieldValue, errors, values }) => (
            <Form>
              <div className="row g-3">
                {/* <div className="add_product_header">
                  <Button variant="outlined" onClick={() => openModel("brand")}>
                    Add new brand
                  </Button>
                  <Button variant="outlined" onClick={() => openModel("category")}>
                    Add new category
                  </Button>
                </div> */}

                <div className="col-md-12">
                  <TextField
                    fullWidth
                    size="small"
                    name="title"
                    label="Product Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </div>

                <div className="col-md-4">
                  <TextField
                    fullWidth
                    size="small"
                    name="sale_price"
                    label="Sale Price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sale_price}
                    error={touched.sale_price && Boolean(errors.sale_price)}
                    helperText={touched.sale_price && errors.sale_price}
                  />
                </div>

                <div className="col-md-4">
                  <TextField
                    fullWidth
                    size="small"
                    name="purchase_price"
                    label="Purchase Price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.purchase_price}
                    error={touched.purchase_price && Boolean(errors.purchase_price)}
                    helperText={touched.purchase_price && errors.purchase_price}
                  />
                </div>

                <div className="col-md-4">
                  <TextField
                    fullWidth
                    size="small"
                    name="stock"
                    label="Stock"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.stock}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <textarea
                      className="add_product_detail"
                      name="detail"
                      rows={5}
                      placeholder="Type here..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.detail}
                      style={{
                        borderColor:
                          touched.detail && Boolean(errors.detail) && "red",
                      }}
                    />
                    <span style={{ color: "red" }}>
                      {touched.detail && errors.detail}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <FileUpload files={files} setFiles={setFiles} />
                  </div>
                </div>

                <div className="col-md-6">
                  <Autocomplete
                    options={brands}
                    value={values.brand}
                    onChange={(e, newValue) => setFieldValue("brand", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="brand"
                        label="Select brand"
                        onBlur={handleBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                        size="small"
                        fullWidth
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
                        {...params}
                        name="category"
                        label="Select category"
                        onBlur={handleBlur}
                        error={touched.category && Boolean(errors.category)}
                        helperText={touched.category && errors.category}
                        size="small"
                        fullWidth
                      />
                    )}
                  />
                </div>

                <div className="add_product_actions">
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SaveIcon />}
                    disabled={loading}
                  >
                    {loading ? "Wait..." : "Save"}
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

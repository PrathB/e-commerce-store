import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../State/Admin/Product/action";
import { findProductById } from "../../State/Product/action";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector((store) => store.product.product);
  const updatedProduct = useSelector(
    (store) => store.adminProduct.updatedProduct
  );
  const updateError = useSelector((store) => store.adminProduct.error);
  const loading = useSelector((store) => store.product.loading);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    dispatch(findProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (updateError) {
      setIsSubmitting(false);
      setOpenErrorSnackbar(true);
    }
  }, [updateError]);

  useEffect(() => {
    if (updatedProduct) {
      setOpenSuccessSnackbar(true);
      setIsSubmitting(false);
      setTimeout(() => {
        dispatch({ type: "RESET_UPDATED_PRODUCT" });
        navigate(-1);
      }, 2000);
    }
  }, [updatedProduct, navigate, dispatch]);

  const [productData, setProductData] = useState({
    title: product?.title || "",
    imageUrl: product?.imageUrl || "",
    category: {
      level1: product?.category?.level1 || "",
      level2: product?.category?.level2 || "",
      level3: product?.category?.level3 || "",
    },
    quantity: product?.quantity || 0,
    price: product?.price || 0,
    discountedPrice: product?.discountedPrice || 0,
    discountPercent: product?.discountPercent || 0,
    brand: product?.brand || "",
    description: product?.description || "",
    highlights: product?.highlights || [],
    compatibility: product?.compatibility || [],
    specifications: product?.specifications || {},
  });

  const calculateDiscountPercent = (price, discountedPrice) => {
    if (price <= 0) return 0;
    const discountPercent = ((price - discountedPrice) / price) * 100;
    return Math.round(discountPercent);
  };

  useEffect(() => {
    if (product) {
      setProductData({
        title: product.title || "",
        imageUrl: product.imageUrl || "",
        category: {
          level1: product.category?.level1 || "",
          level2: product.category?.level2 || "",
          level3: product.category?.level3 || "",
        },
        quantity: product.quantity || 0,
        price: product.price || 0,
        discountedPrice: product.discountedPrice || 0,
        discountPercent: product.discountPercent || 0,
        brand: product.brand || "",
        description: product.description || "",
        highlights: product.highlights || [],
        specifications: {
          weight: product.specifications?.weight || "",
          dimensions: product.specifications?.dimensions || "",
          carMake: product.specifications?.carMake || "",
          carModel: product.specifications?.carModel || "",
          carSubModel: product.specifications?.carSubModel || "",
          partBrand: product.specifications?.partBrand || "",
          partOrigin: product.specifications?.partOrigin || "",
          netQuantity: product.specifications?.netQuantity || "",
          countryOfOrigin: product.specifications?.countryOfOrigin || "",
          partNumber: product.specifications?.partNumber || "",
          partCategory: product.specifications?.partCategory || "",
        },
        compatibility: product.compatibility || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberFields = ["quantity", "price", "discountedPrice"];

    if (numberFields.includes(name)) {
      const numericValue = value === "" ? "" : parseInt(value, 10);

      // Special logic for automatic discount percent calculation
      if (name === "price" || name === "discountedPrice") {
        const price = name === "price" ? numericValue : productData.price;
        const discountedPrice =
          name === "discountedPrice"
            ? numericValue
            : productData.discountedPrice;

        const calculatedDiscountPercent = calculateDiscountPercent(
          price,
          discountedPrice
        );

        setProductData((prevState) => ({
          ...prevState,
          [name]: numericValue,
          discountPercent: calculatedDiscountPercent,
        }));
      } else {
        setProductData((prevState) => ({
          ...prevState,
          [name]: numericValue,
        }));
      }
    } else {
      const keys = name.split(".");
      if (keys.length === 2) {
        setProductData((prevState) => ({
          ...prevState,
          [keys[0]]: {
            ...prevState[keys[0]],
            [keys[1]]: value,
          },
        }));
      } else {
        setProductData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(updateProduct(productId, productData));
  };

  return (
    <Box p={5}>
      <Typography variant="h3" textAlign="center" mb={4}>
        Update Product
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </Grid>

            {["level1", "level2", "level3"].map((level, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <TextField
                  fullWidth
                  label={`Category Level ${index + 1}`}
                  name={`category.${level}`}
                  value={productData.category[level]}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={productData.quantity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Discounted Price"
                name="discountedPrice"
                type="number"
                value={productData.discountedPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Discount Percent"
                name="discountPercent"
                type="number"
                value={productData.discountPercent}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Highlights (Newline Separated)"
                name="highlights"
                value={productData.highlights?.join("\n") || ""}
                onChange={(e) =>
                  setProductData((prevState) => ({
                    ...prevState,
                    highlights: e.target.value.split("\n"),
                  }))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Compatibility (Newline Separated)"
                name="compatibility"
                value={productData.compatibility?.join("\n") || ""}
                onChange={(e) =>
                  setProductData((prevState) => ({
                    ...prevState,
                    compatibility: e.target.value.split("\n"),
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: "2rem" }}>
              <Typography textAlign={"left"} variant="h5" gutterBottom>
                Specifications
              </Typography>
            </Grid>
            {Object.entries(productData.specifications).map(
              ([key, value], index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    required={key === "partNumber"}
                    fullWidth
                    label={key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    name={`specifications.${key}`}
                    value={value}
                    onChange={handleChange}
                  />
                </Grid>
              )
            )}
          </Grid>
          <Box mt={4} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mx: 4,
                my: 2,
                textTransform: "none",
                py: 1,
                px: 4,
                backgroundColor: "#7f0000",
                "&:hover": { backgroundColor: "#500000" },
              }}
            >
              {isSubmitting ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", color: "white" }}
                >
                  <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                  Submitting...
                </Box>
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              variant="text"
              sx={{
                mx: 4,
                my: 2,
                textTransform: "none",
                py: 1,
                px: 4,
                color: "#7f0000",
                "&:hover": {
                  backgroundColor: "#d3d3d3",
                },
              }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      )}

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSuccessSnackbar(false)}>
          Product Updated Successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenErrorSnackbar(false)}>
          {updateError
            ? updateError || "Failed to create product. Please try again."
            : "An error occurred"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateProductForm;

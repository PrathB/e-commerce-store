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
  const loading1 = useSelector((store) => store.product.loading);
  const loading2 = useSelector((store) => store.adminProduct.loading);
  const loading = loading1 || loading2;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(findProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (updatedProduct) {
      setOpenSnackbar(true);
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

    const numberFields = [
      "quantity",
      "price",
      "discountedPrice",
      "discountPercent",
    ];

    if (numberFields.includes(name)) {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value === "" ? "" : parseInt(value, 10),
      }));
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
            <Button
              type="submit"
              variant="contained"
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
              Submit
            </Button>
          </Box>
        </form>
      )}

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Product Updated Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateProductForm;

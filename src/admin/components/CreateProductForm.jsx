import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../State/Product/action";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const createdProduct = useSelector((store) => store.product.createdProduct);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (createdProduct) {
      setOpenSnackbar(true);
    }
  }, [createdProduct]);

  const [productData, setProductData] = useState({
    title: "",
    imageUrl: "",
    category: {
      level1: "",
      level2: "",
      level3: "",
    },
    quantity: 0,
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
    brand: "",
    description: "",
    highlights: [],
    specifications: {
      weight: "",
      dimensions: "",
      carMake: "",
      carModel: "",
      carSubModel: "",
      partBrand: "",
      partOrigin: "",
      netQuantity: "",
      countryOfOrigin: "",
      partNumber: "",
      partCategory: "",
    },
    compatibility: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field needs to be parsed as a number
    const numberFields = [
      "quantity",
      "price",
      "discountedPrice",
      "discountPercent",
    ];

    if (numberFields.includes(name)) {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value === "" ? "" : parseInt(value, 10), // Parse as an integer or empty string
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
    dispatch(createProduct(productData));
    console.log(productData);
  };

  return (
    <Box p={5}>
      <Typography variant="h3" textAlign="center" mb={4}>
        Add New Product
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          {/* General Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          {/* Category Details */}
          {["level1", "level2", "level3"].map((level, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TextField
                required
                fullWidth
                label={`Category Level ${index + 1}`}
                name={`category.${level}`}
                value={productData.category[level]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          {/* Pricing and Quantity */}
          <Grid item xs={12} sm={3}>
            <TextField
              required
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
              required
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
              required
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
              required
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
              required
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
              required
              fullWidth
              multiline
              rows={3}
              label="Highlights (Newline Separated)"
              name="highlights"
              value={productData.highlights.join("\n")}
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
              required
              fullWidth
              multiline
              rows={3}
              label="Compatibility (Newline Separated)"
              name="compatibility"
              value={productData.compatibility.join("\n")}
              onChange={(e) =>
                setProductData((prevState) => ({
                  ...prevState,
                  compatibility: e.target.value.split("\n"),
                }))
              }
            />
          </Grid>

          {/* Specifications */}
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

        {/* Submit Button */}
        <Box mt={4} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Product Created Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateProductForm;

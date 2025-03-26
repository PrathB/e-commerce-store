import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../State/Admin/Product/action";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const createdProduct = useSelector(
    (store) => store.adminProduct.createdProduct
  );
  const error = useSelector((store) => store.adminProduct.error);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openImageErrorSnackbar, setOpenImageErrorSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = {
    "Suspension And Steering": [
      "Strut And Shock Absorber",
      "Control Arm",
      "Stabilizer And Link",
      "Bush Strut Mounting And Kit",
    ],
    "Engine Parts": ["Filter", "Mounting"],
    "Braking System": ["Brake Pad", "Disc Rotor", "Brake Booster"],
    Electrical: ["Sensor", "Ignition", "Electronic Control Unit", "Battery"],
    "Cooling And HVAC": [
      "Refrigerant System",
      "Radiator",
      "Condensor",
      "Evaporator",
      "Compressor",
    ],
    "Body Parts": [
      "Rear View Mirror",
      "Fender And Fender Liner",
      "Wheel Rim",
      "Wheel Cover",
      "Bumper",
      "Headlight",
      "Tailight",
    ],
    "Safety System": ["Airbag System", "Seatbelt System"],
    Accessories: [
      "Windshield And Wiper",
      "Seatcover And Mat",
      "Entertainment System",
    ],
  };

  const categoryLevel1Options = Object.keys(categoryOptions);

  useEffect(() => {
    if (createdProduct) {
      setOpenSuccessSnackbar(true);
      setIsSubmitting(false);
    }
  }, [createdProduct]);

  useEffect(() => {
    if (error) {
      setOpenErrorSnackbar(true);
      setIsSubmitting(false);
    }
  }, [error]);

  const [productData, setProductData] = useState({
    title: "",
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

  const [image, setImage] = useState(null);

  const calculateDiscountPercent = (price, discountedPrice) => {
    if (price <= 0) return 0;
    const discountPercent = ((price - discountedPrice) / price) * 100;
    return Math.round(discountPercent);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["quantity", "price", "discountedPrice"].includes(name)) {
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
    } else if (name.startsWith("category.")) {
      const [parent, child] = name.split(".");

      // If changing level1, reset level2
      if (child === "level1") {
        setProductData((prevState) => ({
          ...prevState,
          category: {
            ...prevState.category,
            [child]: value,
            level2: "", // Reset level2 when level1 changes
          },
        }));
      } else {
        setProductData((prevState) => ({
          ...prevState,
          [parent]: { ...prevState[parent], [child]: value },
        }));
      }
    } else if (name.startsWith("specifications.")) {
      const [parent, child] = name.split(".");
      setProductData((prevState) => ({
        ...prevState,
        [parent]: { ...prevState[parent], [child]: value },
      }));
    } else {
      setProductData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    const formattedProductData = {
      ...productData,
      quantity: Number(productData.quantity),
      price: Number(productData.price),
      discountedPrice: Number(productData.discountedPrice),
      discountPercent: Number(productData.discountPercent),
      category: JSON.stringify(productData.category),
      specifications: JSON.stringify(productData.specifications),
      highlights: JSON.stringify(productData.highlights),
      compatibility: JSON.stringify(productData.compatibility),
    };

    Object.keys(formattedProductData).forEach((key) => {
      formData.append(key, formattedProductData[key]);
    });

    if (image) {
      formData.append("image", image);
    }
    if (!image) {
      setOpenImageErrorSnackbar(true);
      setIsSubmitting(false);
      return;
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    dispatch(createProduct(formData));
  };

  // Get the available level2 options based on the selected level1
  const getLevel2Options = () => {
    const level1Selection = productData.category.level1;
    return level1Selection ? categoryOptions[level1Selection] : [];
  };

  return (
    <Box p={5}>
      <Typography variant="h3" textAlign="center" mb={4}>
        Add New Product
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          {/* General Details */}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                textTransform: "none",
                py: 1,
                backgroundColor: "#7f0000",
                "&:hover": { backgroundColor: "#500000" },
              }}
            >
              Upload Product Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {image && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Selected: {image.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="category-level1-label">
                Category Level 1
              </InputLabel>
              <Select
                labelId="category-level1-label"
                id="category-level1"
                name="category.level1"
                value={productData.category.level1}
                label="Category Level 1"
                onChange={handleChange}
              >
                {categoryLevel1Options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              disabled={!productData.category.level1}
            >
              <InputLabel id="category-level2-label">
                Category Level 2
              </InputLabel>
              <Select
                labelId="category-level2-label"
                id="category-level2"
                name="category.level2"
                value={productData.category.level2}
                label="Category Level 2"
                onChange={handleChange}
              >
                {getLevel2Options().map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Category Level 3"
              name="category.level3"
              value={productData.category.level3}
              onChange={handleChange}
            />
          </Grid>

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
              InputProps={{
                readOnly: true,
              }}
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
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              textTransform: "none",
              py: 1,
              minWidth: "120px",
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
        </Box>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSuccessSnackbar(false)}>
          Product Created Successfully!
        </Alert>
      </Snackbar>

      {/* Image missing Snackbar */}
      <Snackbar
        open={openImageErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenImageErrorSnackbar(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenImageErrorSnackbar(false)}
        >
          Upload Product Image!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenErrorSnackbar(false)}>
          {error
            ? error || "Failed to create product. Please try again."
            : "An error occurred"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateProductForm;

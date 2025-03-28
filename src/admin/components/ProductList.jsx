import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Typography,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductByID,
  getAllProducts,
} from "../../State/Admin/Product/action";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const productArray = useSelector((store) => store.adminProduct.allProducts);
  const deletedProduct = useSelector(
    (store) => store.adminProduct.deletedProduct
  );
  const error = useSelector((store) => store.adminProduct.error);
  const loading = useSelector((store) => store.adminProduct.loading);

  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
    console.log(error);
  }, [deletedProduct, dispatch, error]);

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      dispatch(deleteProductByID(selectedProductId));
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateClick = (productId) => {
    navigate(`update-product/${productId}`);
  };

  const MobileProductCard = ({ product }) => (
    <Card
      sx={{
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Product Image */}
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: 120, sm: 140 },
                height: { xs: 120, sm: 140 },
                overflow: "hidden",
              }}
            >
              <img
                src={product.imageUrl}
                alt="product"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          {/* Product Description */}
          <Grid item xs={12} sm={9}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Category: {product.category?.level3}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Part Number: {product.specifications?.partNumber}
              </Typography>

              {/* Price Details */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Typography variant="subtitle1">
                  ₹{product.discountedPrice}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textDecoration: "line-through",
                  }}
                >
                  ₹{product.price}
                </Typography>

                <Typography variant="body2" color="success.main">
                  {product.discountPercent}% off
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Quantity and Action Buttons */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Qty:
              </Typography>
              <Typography variant="body2">{product.quantity}</Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                size="small"
                onClick={() => handleUpdateClick(product._id)}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                size="small"
                onClick={() => handleDeleteClick(product._id)}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              All Products
            </Typography>
          }
        />

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : isMobile ? (
          <Box sx={{ p: 2 }}>
            {productArray &&
              productArray.map((item) => (
                <MobileProductCard key={item._id} product={item} />
              ))}
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">IMG</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Part Number</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discounted Price</TableCell>
                  <TableCell align="left">Discount %</TableCell>
                  <TableCell align="left">QTY</TableCell>

                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productArray &&
                  productArray.map((item) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar
                          src={item.imageUrl}
                          variant="square"
                          sx={{ width: 64, height: 64 }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "10rem" }}>
                        {item.title}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "10rem" }}>
                        {item.specifications?.partNumber}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "2rem" }}>
                        {item.category?.level3}
                      </TableCell>
                      <TableCell align="left">₹{item.price}</TableCell>
                      <TableCell align="left">
                        ₹{item.discountedPrice}
                      </TableCell>
                      <TableCell align="left">{item.discountPercent}</TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>

                      <TableCell align="center">
                        <Button
                          variant="text"
                          color="primary"
                          sx={{ marginY: 2 }}
                          onClick={() => handleUpdateClick(item._id)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleDeleteClick(item._id)}
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;

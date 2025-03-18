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
    <div className="p-5 shadow-lg border rounded-md mb-5">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Product Image */}
        <div className="w-[7.5rem] h-[7.5rem] lg:w-[9rem] lg:h-[9rem] flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={product.imageUrl}
            alt="product"
          />
        </div>

        {/* Product Description */}
        <div className="ml-0 lg:ml-5 space-y-1 text-left flex-1 mt-4 lg:mt-0">
          <p className="font-semibold text-sm lg:text-base">{product.title}</p>
          <p className="opacity-70 mt-2 text-xs lg:text-sm">
            Category: {product.category?.level3}
          </p>
          <p className="opacity-70 mt-2 text-xs lg:text-sm">
            Part Number: {product.specifications?.partNumber}
          </p>

          {/* Price Details */}
          <div className="flex space-x-5 items-center pt-4">
            <p className="tracking-tight text-gray-900 text-sm lg:text-base">
              ₹{product.discountedPrice}
            </p>
            <p className="tracking-tight text-gray-900 opacity-60 line-through text-sm lg:text-base">
              ₹{product.price}
            </p>
            <p className="text-green-600 font-semibold text-xs lg:text-sm">
              {product.discountPercent}% off
            </p>
          </div>
        </div>
      </div>

      {/* Quantity and Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:space-x-10 pt-4">
        <div className="flex flex-col items-start mr-4 mb-4 lg:mb-0">
          <div className="flex flex-row items-center space-x-3">
            <p className="font-semibold">Qty:</p>
            <span className="text-sm">{product.quantity}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdateClick(product._id)}
            startIcon={<Edit />}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteClick(product._id)}
            startIcon={<Delete />}
            size="small"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
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

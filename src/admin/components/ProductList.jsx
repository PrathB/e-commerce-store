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

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />

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
        <DialogTitle>Confirm Deletion</DialogTitle>
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

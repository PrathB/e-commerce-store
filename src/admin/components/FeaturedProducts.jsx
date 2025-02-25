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
import { getFeaturedProducts } from "../../State/Product/action";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const featuredProducts = useSelector((store) => store.product.featured);
  const error = useSelector((store) => store.product.error);
  const loading = useSelector((store) => store.product.loading);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    console.log(error);
  }, [dispatch, error]);

  const handleRemoveClick = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      //   dispatch(deleteProductByID(selectedProductId));
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Featured Products" />

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
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discounted Price</TableCell>
                  <TableCell align="left">Discount Percent</TableCell>
                  <TableCell align="left">QTY</TableCell>
                  <TableCell align="center">Remove from featured</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featuredProducts &&
                  featuredProducts.map((item) => (
                    <TableRow
                      key={item.product._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar src={item.product.imageUrl} />
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "10rem" }}>
                        {item.product.title}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "2rem" }}>
                        {item.product.category?.level3}
                      </TableCell>
                      <TableCell align="left">₹{item.product.price}</TableCell>
                      <TableCell align="left">
                        ₹{item.product.discountedPrice}
                      </TableCell>
                      <TableCell align="left">
                        {item.product.discountPercent}
                      </TableCell>
                      <TableCell align="left">
                        {item.product.quantity}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleRemoveClick(item.product._id)}
                        >
                          Remove
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
          Are you sure you want to remove this product from featured section?
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

export default FeaturedProducts;

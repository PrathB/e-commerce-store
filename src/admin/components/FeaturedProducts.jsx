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
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../../State/Product/action";
import {
  addProductsToFeatured,
  getNonFeaturedProducts,
  removeProductfromFeatured,
} from "../../State/Admin/Product/action";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector((store) => store.product.featured);
  const nonFeaturedProducts = useSelector(
    (store) => store.adminProduct.nonFeaturedProducts
  );

  const addedFeaturedProducts = useSelector(
    (store) => store.adminProduct.addedFeaturedProducts
  );
  const removedFeaturedProduct = useSelector(
    (store) => store.adminProduct.removedFeaturedProduct
  );
  const error = useSelector((store) => store.product.error);
  const loading1 = useSelector((store) => store.product.loading);
  const loading2 = useSelector((store) => store.adminProduct.loading);
  const loading = loading1 || loading2;
  const [open, setOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getNonFeaturedProducts());
    console.log(error);
  }, [addedFeaturedProducts, removedFeaturedProduct, dispatch, error]);

  const handleRemoveClick = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedProductId) {
      dispatch(removeProductfromFeatured(selectedProductId));
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProductClick = () => {
    setAddDialogOpen(true);
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSubmitAddProducts = () => {
    if (selectedProducts.length > 0) {
      dispatch(addProductsToFeatured(selectedProducts));
    }
    setAddDialogOpen(false);
    setSelectedProducts([]);
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Featured Products" />

        <div className="flex justify-start">
          <Button
            type="submit"
            variant="contained"
            onClick={handleAddProductClick}
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
            Add Product
          </Button>
        </div>

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
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discounted Price</TableCell>
                  <TableCell align="left">Discount Percent</TableCell>
                  <TableCell align="center">Remove from featured</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featuredProducts &&
                  featuredProducts.map((item) => (
                    <TableRow
                      key={item.product?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar
                          src={item.product?.imageUrl}
                          sx={{ width: 64, height: 64 }}
                          variant="square"
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "10rem" }}>
                        {item.product?.title}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "2rem" }}>
                        {item.product?.category?.level3}
                      </TableCell>
                      <TableCell align="left">₹{item.product?.price}</TableCell>
                      <TableCell align="left">
                        ₹{item.product?.discountedPrice}
                      </TableCell>
                      <TableCell align="left">
                        {item.product?.discountPercent}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleRemoveClick(item.product?._id)}
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

      {/* Remove Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this product from featured section?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Products Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select Products to Add</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Part Number</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Discounted Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nonFeaturedProducts &&
                  nonFeaturedProducts.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(item._id)}
                          onChange={() => handleProductSelect(item._id)}
                          sx={{
                            color: "#2c2c2c", // Default color
                            "&.Mui-checked": {
                              color: "#7f0000", // Checked color
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Avatar
                          src={item.imageUrl}
                          sx={{ width: 64, height: 64 }}
                          variant="square"
                        />
                      </TableCell>
                      <TableCell align="left">{item.title}</TableCell>
                      <TableCell align="left">
                        {item.specifications?.partNumber}
                      </TableCell>
                      <TableCell align="left">
                        {item.category?.level3}
                      </TableCell>
                      <TableCell align="left">
                        ₹{item.discountedPrice}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddDialogOpen(false)}
            sx={{
              mx: 2,
              my: 2,
              textTransform: "none",
              py: 1,
              px: 2,
              color: "#7f0000",
              "&:hover": { backgroundColor: "#d3d3d3" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitAddProducts}
            variant="contained"
            sx={{
              mx: 2,
              my: 2,
              textTransform: "none",
              py: 1,
              px: 2,
              backgroundColor: "#7f0000",
              "&:hover": { backgroundColor: "#500000" },
            }}
          >
            Add to Featured
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeaturedProducts;

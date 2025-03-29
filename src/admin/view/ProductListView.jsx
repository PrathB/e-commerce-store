import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../State/Admin/Product/action";

const ProductListView = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const productArray = useSelector((store) => store.adminProduct.allProducts);
  const loading = useSelector((store) => store.adminProduct.loading);
  const error = useSelector((store) => store.adminProduct.error);

  useEffect(() => {
    dispatch(getAllProducts());
    console.log(error);
  }, [dispatch, error]);

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

        {/* Quantity */}
        <Grid container alignItems="center">
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Qty:
              </Typography>
              <Typography variant="body2">{product.quantity}</Typography>
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
              Recently Created Products
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
              productArray
                .slice(0, 5)
                .map((item) => (
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
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Discounted Price</TableCell>
                  <TableCell align="left">QTY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productArray &&
                  productArray.slice(0, 5).map((item) => (
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
                      <TableCell align="left" sx={{ maxWidth: "2rem" }}>
                        {item.category?.level3}
                      </TableCell>
                      <TableCell align="left">
                        ₹{item.discountedPrice}
                      </TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
};

export default ProductListView;

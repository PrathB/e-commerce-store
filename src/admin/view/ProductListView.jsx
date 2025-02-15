import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../State/Product/action";

const ProductListView = () => {
  const dispatch = useDispatch();
  const productArray = useSelector((store) => store.product.allProducts);
  const loading = useSelector((store) => store.product.loading);
  const error = useSelector((store) => store.product.error);

  useEffect(() => {
    dispatch(getAllProducts());
    console.log(error);
  }, [dispatch, error]);

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Recently Created Products" />

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
                  <TableCell align="left">Discounted Price</TableCell>
                  <TableCell align="left">QTY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productArray &&
                  productArray.slice(0, 10).map((item) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar src={item.imageUrl} />
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "10rem" }}>
                        {item.title}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "2rem" }}>
                        {item.category?.level3}
                      </TableCell>
                      <TableCell align="left">{item.discountedPrice}</TableCell>
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

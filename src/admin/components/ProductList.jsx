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
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductByID, getProducts } from "../../State/Product/action";

const ProductList = () => {
  const dispatch = useDispatch();
  const productArray = useSelector((store) => store.product.pageData.content);
  const deletedProduct = useSelector((store) => store.product.deletedProduct);
  const error = useSelector((store) => store.product.error);

  const handleProductDelete = (productId) => {
    dispatch(deleteProductByID(productId));
  };

  useEffect(() => {
    const data = {
      category: null,
      carMake: null,
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      sort: "low_to_high",
      stock: null,
      pageNumber: 1,
      pageSize: 10,
    };

    dispatch(getProducts(data));
    console.log(error);
  }, [deletedProduct]);

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">IMG</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Discounted Price</TableCell>
                <TableCell align="left">QTY</TableCell>
                <TableCell align="left">Delete</TableCell>
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
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => handleProductDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductList;

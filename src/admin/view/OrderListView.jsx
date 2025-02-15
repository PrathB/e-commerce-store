import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/Admin/Order/action";
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

const OrderListView = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.adminOrder.loading);
  const orderArray = useSelector((store) => store.adminOrder.orders);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />

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
                  <TableCell align="left">Items</TableCell>
                  <TableCell align="left">Order ID</TableCell>
                  <TableCell align="left">Total Price</TableCell>
                  <TableCell align="left">User Name</TableCell>
                  <TableCell align="left">Created At</TableCell>
                  <TableCell align="left">Order Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderArray &&
                  orderArray.slice(0, 5).map((item) => (
                    <TableRow
                      key={item._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left" scope="row">
                        {item.orderItems.map((orderItem) => (
                          <div
                            className="flex py-1 items-center"
                            key={orderItem.product.id}
                          >
                            <Avatar
                              className="mr-1"
                              src={orderItem.product.imageUrl}
                            />
                            <p>
                              {orderItem.product.title} x {orderItem.quantity}
                            </p>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="left">{item._id}</TableCell>
                      <TableCell align="left">{item.totalPrice}</TableCell>
                      <TableCell align="left">
                        {item.user.firstName} {item.user.lastName}
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell align="left">
                        <span
                          className={`text-white px-5 py-2 rounded-sm 
                        ${
                          item.orderStatus === "PENDING"
                            ? "bg-red-500"
                            : item.orderStatus === "PLACED"
                            ? "bg-orange-400"
                            : item.orderStatus === "CONFIRMED"
                            ? "bg-green-300"
                            : item.orderStatus === "SHIPPED"
                            ? "bg-green-400"
                            : item.orderStatus === "DELIVERED"
                            ? "bg-green-500"
                            : "bg-red-800"
                        }`}
                        >
                          {item.orderStatus}
                        </span>
                      </TableCell>
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

export default OrderListView;

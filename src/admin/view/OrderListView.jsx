import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/Admin/Order/action";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
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

const OrderListView = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.adminOrder.loading);
  const orderArray = useSelector((store) => store.adminOrder.orders);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const MobileOrderCard = ({ order }) => {
    return (
      <Card sx={{ mb: 2, position: "relative" }}>
        <Box sx={{ p: 2 }}>
          {/* Order Details */}
          <Typography variant="subtitle1" fontWeight="bold">
            Order ID: {order._id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: {formatDate(order.createdAt)}
          </Typography>

          {/* Order Status Badge */}
          <Box
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              borderRadius: 1,
              color: "white",
              backgroundColor:
                order.orderStatus === "PENDING"
                  ? "#ef4444" // red-500
                  : order.orderStatus === "PLACED"
                  ? "#fb923c" // orange-400
                  : order.orderStatus === "CONFIRMED"
                  ? "#86efac" // green-300
                  : order.orderStatus === "SHIPPED"
                  ? "#4ade80" // green-400
                  : order.orderStatus === "DELIVERED"
                  ? "#22c55e" // green-500
                  : order.orderStatus === "CANCELLED"
                  ? "#991b1b" // red-800
                  : "default",
            }}
          >
            {order.orderStatus}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Order Items */}
          <Box>
            {order.orderItems.map((item, index) => (
              <Box
                key={`${order._id}-${item.product?._id}-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  variant="square"
                  src={item.product?.imageUrl}
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 2,
                    boxShadow: 1,
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                />
                <Box>
                  <Typography variant="body1">{item.product?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Order Summary */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" color="text.secondary">
              Total Price:
            </Typography>
            <Typography variant="subtitle2">₹{order.totalPrice}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              User:
            </Typography>
            <Typography variant="body2">
              {order.user?.firstName} {order.user?.lastName}
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Recent Orders
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
            {orderArray &&
              orderArray
                .slice(0, 5)
                .map((item) => <MobileOrderCard key={item._id} order={item} />)}
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
                        {item.orderItems.map((orderItem, index) => (
                          <div
                            className="flex py-1 items-center"
                            key={`${item._id}-${orderItem.product?._id}-${index}`}
                          >
                            <Avatar
                              className="m-2 shadow-sm border"
                              sx={{ width: 64, height: 64 }}
                              variant="square"
                              src={orderItem.product?.imageUrl}
                            />
                            <p>
                              {orderItem.product?.title} x {orderItem?.quantity}
                            </p>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="left">{item._id}</TableCell>
                      <TableCell align="left">₹{item.totalPrice}</TableCell>
                      <TableCell align="left">
                        {item.user?.firstName} {item.user?.lastName}
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
                                : item.orderStatus === "CANCELLED"
                                ? "bg-red-800"
                                : ""
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

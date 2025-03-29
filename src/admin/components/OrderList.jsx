import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/action";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
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
import { CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderArray = useSelector((store) => store.adminOrder.orders);
  const confirmedOrder = useSelector((store) => store.adminOrder.confirmed);
  const shippedOrder = useSelector((store) => store.adminOrder.shipped);
  const deliveredOrder = useSelector((store) => store.adminOrder.delivered);
  const cancelledOrder = useSelector((store) => store.adminOrder.cancelled);
  const deletedOrder = useSelector((store) => store.adminOrder.deleted);
  const loading = useSelector((store) => store.adminOrder.loading);

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
  }, [
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    deletedOrder,
    cancelledOrder,
    dispatch,
  ]);

  const [anchorElMap, setAnchorElMap] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleClick = (event, orderId) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: null }));
  };

  const handleConfirmOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose(orderId);
  };

  const handleShipOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose(orderId);
  };

  const handleDeliverOrder = (orderId) => {
    dispatch(deliverOrder(orderId));
    handleClose(orderId);
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    handleClose(orderId);
  };

  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOrderId) {
      dispatch(deleteOrder(selectedOrderId));
    }
    setOpenConfirmDialog(false);
  };

  const MobileOrderCard = ({ order }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleStatusClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleStatusClose = () => {
      setAnchorEl(null);
    };

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
                key={`${order._id}-${item.product?.id}-${index}`}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              Email:
            </Typography>
            <Typography variant="body2">{order.user?.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              Mobile No.:
            </Typography>
            <Typography variant="body2">
              {order.shippingAddress?.mobile}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mt: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mr: 2, mb: 1 }}
            >
              Shipping Address:
            </Typography>
            <Typography variant="body2">
              {order.shippingAddress?.streetAddress},{" "}
              {order.shippingAddress?.city}, {order.shippingAddress?.state},{" "}
              {order.shippingAddress?.pinCode}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Actions */}
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleStatusClick}
              >
                Update Status
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleStatusClose}
                anchorReference="anchorEl"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      width: "auto",
                      minWidth: anchorEl ? anchorEl.offsetWidth : "auto",
                      maxWidth: "300px",
                    },
                  },
                  root: {
                    sx: {
                      ".MuiMenu-list": {
                        width: "auto",
                        padding: 0,
                      },
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleConfirmOrder(order._id);
                    handleStatusClose();
                  }}
                >
                  CONFIRMED
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleShipOrder(order._id);
                    handleStatusClose();
                  }}
                >
                  SHIPPED
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeliverOrder(order._id);
                    handleStatusClose();
                  }}
                >
                  DELIVERED
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCancelOrder(order._id);
                    handleStatusClose();
                  }}
                >
                  CANCELLED
                </MenuItem>
              </Menu>
            </div>

            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              fullWidth
              onClick={() => handleDeleteClick(order._id)}
            >
              Delete
            </Button>
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
              All Orders
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
              orderArray.map((item) => (
                <MobileOrderCard key={item._id} order={item} />
              ))}
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Items</TableCell>
                  <TableCell align="left">Order ID</TableCell>
                  <TableCell align="left">Total Price</TableCell>
                  <TableCell align="left">User</TableCell>
                  <TableCell align="left">Shipping Address</TableCell>
                  <TableCell align="left">Created At</TableCell>
                  <TableCell align="left">Order Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderArray &&
                  orderArray.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell align="left">
                        {item.orderItems.map((orderItem, index) => (
                          <div
                            className="flex py-1 items-center"
                            key={`${item._id}-${orderItem.product?.id}-${index}`}
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
                        <div className="flex flex-col space-y-1">
                          <div>
                            {item.user?.firstName} {item.user?.lastName}
                          </div>
                          <div>{item.user?.email}</div>
                          <div>{item.shippingAddress?.mobile}</div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        {item.shippingAddress?.streetAddress},{" "}
                        {item.shippingAddress?.city},{" "}
                        {item.shippingAddress?.state},{" "}
                        {item.shippingAddress?.pinCode}
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
                      <TableCell align="left">
                        <div className="flex flex-col items-center">
                          <div className="my-2">
                            <Button
                              onClick={(event) => handleClick(event, item._id)}
                            >
                              Update Status
                            </Button>
                            <Menu
                              anchorEl={anchorElMap[item._id]}
                              open={Boolean(anchorElMap[item._id])}
                              onClose={() => handleClose(item._id)}
                            >
                              <MenuItem
                                onClick={() => handleConfirmOrder(item._id)}
                              >
                                CONFIRMED
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleShipOrder(item._id)}
                              >
                                SHIPPED
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDeliverOrder(item._id)}
                              >
                                DELIVERED
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleCancelOrder(item._id)}
                              >
                                CANCELLED
                              </MenuItem>
                            </Menu>
                          </div>
                          <Button
                            onClick={() => handleDeleteClick(item._id)}
                            color="error"
                          >
                            <Delete />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this order? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderList;

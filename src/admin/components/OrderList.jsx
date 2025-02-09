import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/action";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderArray = useSelector((store) => store.adminOrder.orders);
  const confirmedOrder = useSelector((store) => store.adminOrder.confirmed);
  const shippedOrder = useSelector((store) => store.adminOrder.shipped);
  const deliveredOrder = useSelector((store) => store.adminOrder.delivered);
  const deletedOrder = useSelector((store) => store.adminOrder.deleted);

  useEffect(() => {
    dispatch(getOrders());
  }, [confirmedOrder, shippedOrder, deliveredOrder, deletedOrder]);

  // Individual menu state for each row
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

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Orders" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Items</TableCell>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Total Price</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Order Status</TableCell>
                <TableCell align="left">Update Status</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderArray &&
                orderArray.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" scope="row">
                      {item.orderItems.map((orderItem, index) => (
                        <div
                          className="flex py-1 items-center"
                          key={`${item._id}-${orderItem.product.id}-${index}`}
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
                    <TableCell align="left">
                      <div>
                        <Button
                          id={`basic-button-${item._id}`}
                          aria-controls={
                            anchorElMap[item._id]
                              ? `basic-menu-${item._id}`
                              : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={Boolean(anchorElMap[item._id])}
                          onClick={(event) => handleClick(event, item._id)}
                        >
                          Status
                        </Button>
                        <Menu
                          id={`basic-menu-${item._id}`}
                          anchorEl={anchorElMap[item._id]}
                          open={Boolean(anchorElMap[item._id])}
                          onClose={() => handleClose(item._id)}
                          MenuListProps={{
                            "aria-labelledby": `basic-button-${item._id}`,
                          }}
                        >
                          <MenuItem
                            onClick={() => handleConfirmOrder(item._id)}
                          >
                            CONFIRMED
                          </MenuItem>
                          <MenuItem onClick={() => handleShipOrder(item._id)}>
                            SHIPPED
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeliverOrder(item._id)}
                          >
                            DELIVERED
                          </MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                    <TableCell align="left">
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

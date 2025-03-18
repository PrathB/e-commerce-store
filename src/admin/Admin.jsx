import {
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import OrderList from "./components/OrderList";
import CustomerList from "./components/CustomerList";
import CreateProductForm from "./components/CreateProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import FeaturedProducts from "./components/FeaturedProducts";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon color="primary" />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <ViewListIcon color="success" />,
  },
  {
    name: "Featured Products",
    path: "/admin/featured-products",
    icon: <WhatshotIcon color="warning" />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <PeopleIcon color="primary" />,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <AssignmentIcon color="error" />,
  },
  {
    name: "Create Product",
    path: "/admin/product/create",
    icon: <AddIcon color="secondary" />,
  },
];

const drawerWidth = 240;

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setSideBarVisible(!sideBarVisible);
  };

  const handleDrawerItemClick = (path) => {
    navigate(path);
    if (!isLargeScreen) toggleDrawer(); // Close the drawer if on small screens
  };

  const drawerContent = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleDrawerItemClick(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {!isLargeScreen && (
        <AppBar position="fixed" sx={{ backgroundColor: "#7f0000" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={sideBarVisible || isLargeScreen}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {!isLargeScreen && <Toolbar />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/create" element={<CreateProductForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/featured-products" element={<FeaturedProducts />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route
            path="/products/update-product/:productId"
            element={<UpdateProductForm />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default Admin;

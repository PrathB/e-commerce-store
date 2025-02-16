import { Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import OrderListView from "../view/OrderListView";
import ProductListView from "../view/ProductListView";

const Dashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={4}>
          <div>
            <Achievement />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div>
            <MonthlyOverview />
          </div>
        </Grid> */}
        <Grid item xs={12}>
          <div>
            <OrderListView />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <ProductListView />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderCard = () => {
  return (
    <div className="lg:p-5 p-2 shadow-md hover:shadow-xl border">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} sm={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover"
              src="https://www.motrparts.com/wp-content/uploads/2019/12/Ford-Ecosport-Figo-Type-2-Diesel-Clutch-Set-8V2Z7B546V.jpg"
              alt="product image"
            />
            <div className="ml-5 space-y-2 text-left">
              <p>
                Clutch Set (Clutch & Pressure Plate) 8V2Z7B546V – Fits Ford
                Ecosport / Figo / Fiesta (T2) / Figo Aspire (Dsl)
              </p>
              <p className="opacity-50 text-xs font-semibold">Qty:1</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} sm={2}>
          <p>₹5,345.00</p>
        </Grid>

        <Grid item xs={12} sm={4}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>Delivered on March 03</span>
              </p>
              <p className="text-xs">Your item has been delivered</p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected delivery on March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
      
    </div>
  );
};

export default OrderCard;

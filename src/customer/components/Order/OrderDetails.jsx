import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid } from "@mui/material";

const OrderDetails = () => {
  return (
    <div className="lg:px-20 px-5">
      <div className="p-5 mt-10 border rounded-md shadow-lg">
        <h1 className="font-bold text-xl pb-7 text-left">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>

      <Grid className="space-y-5" container>
        {[1, 1, 1, 1, 1].map((item) => (
          <div className="p-5 shadow-lg border rounded-md mb-5">
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
              {/* Product Image */}
              <div className="w-[7.5rem] h-[7.5rem] lg:w-[9rem] lg:h-[9rem] flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://www.motrparts.com/wp-content/uploads/2019/12/Ford-Ecosport-Figo-Type-2-Diesel-Clutch-Set-8V2Z7B546V.jpg"
                  alt="product image"
                ></img>
              </div>

              {/* Product Description */}
              <div className="ml-0 lg:ml-5 space-y-1 text-left flex-1 mt-4 lg:mt-0">
                <p className="font-semibold text-sm lg:text-base">
                  Clutch Set (Clutch & Pressure Plate) 8V2Z7B546V – Fits Ford
                  Ecosport / Figo / Fiesta (T2) / Figo Aspire (Dsl)
                </p>
                <p className="opacity-70 mt-2 text-xs lg:text-sm">
                  Seller: Ford Genuine Parts
                </p>

                {/* Price Details */}
                <div className="flex space-x-5 items-center pt-4">
                  <p className="tracking-tight text-gray-900 text-sm lg:text-base">
                    ₹5,029.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;

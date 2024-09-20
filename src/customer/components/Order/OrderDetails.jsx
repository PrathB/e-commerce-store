import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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

      <div className="flex-col space-y-5">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <div
            key={index}
            className="p-5 shadow-lg border rounded-md mb-5 flex flex-col lg:flex-row"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow">
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
                  <p className="opacity-50 text-xs font-semibold">Qty:1</p>
                </div>
              </div>
            </div>

            {/* Rate and Review Section */}
            <div className="flex space-x-1 justify-center items-center lg:ml-auto mt-4 lg:mt-0">
              <StarBorderIcon sx={{ fontSize: 28, color: "#FFBF00" }} />
              <p className="text-sm lg:text-base font-semibold text-[#FFBF00] cursor-pointer">
                Rate and Review
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

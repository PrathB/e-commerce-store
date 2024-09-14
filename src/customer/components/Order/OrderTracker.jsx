import { Step, StepLabel, Stepper, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const OrderTracker = ({ activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="w-full">
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                color: "#9155FD",
                fontSize: isMobile ? "12px" : "16px",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;

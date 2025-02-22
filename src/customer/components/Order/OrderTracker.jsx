import { Step, StepLabel, Stepper, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const steps = ["Placed", "Confirmed", "Shipped", "Delivered"];

const activeStepLabels = {
  0: "Pending",
  1: "Waiting for confirmation",
  2: "Waiting to be picked up",
  3: "Out for Delivery",
};

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
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              sx={{
                color: "#9155FD",
                fontSize: isMobile ? "12px" : "16px",
              }}
            >
              {index === activeStep && activeStepLabels[index]
                ? activeStepLabels[index]
                : label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;

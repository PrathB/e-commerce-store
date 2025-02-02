import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import useMediaQuery from "@mui/material/useMediaQuery";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const querrySearch = new URLSearchParams(location.search);
  const step = parseInt(querrySearch.get("step")) || 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <div className="px-5 py-5 lg:px-20">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={step-1}
            orientation={isSmallScreen ? "vertical" : "horizontal"}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      "& .MuiStepLabel-label": {
                        typography: isSmallScreen ? "caption" : "body1",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Box>
            {/* Step content */}
            <div className="mt-10">
              {step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}

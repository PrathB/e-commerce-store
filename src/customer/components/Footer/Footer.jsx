import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div>
      <Grid
        className="text-white text-centre mt-10"
        style={{ backgroundColor: "#101010" }}
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid className="pb-10" item xs={12} sm={6} md={4}>
          <Typography className="pb-5" variant="h6">
            <strong>Contact Information</strong>
          </Typography>
          <h3>Caraid Automotive Pvt Ltd</h3>
          <h3>Kashmere gate, New Delhi</h3>
          <p className="mt-10">
            <EmailIcon></EmailIcon>Teampiyushbisht@gmail.com
          </p>

          {/* <p className="mt-2">
            <PhoneIcon></PhoneIcon> +91 **********
          </p> */}

          <div className="flex flex-row justify-center mt-5">
            <a
              href="https://www.instagram.com/piyushbishhtt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon
                className="mx-2 hover:text-gray-500"
                fontSize="large"
              ></InstagramIcon>
            </a>
            <a
              href="https://www.facebook.com/p/Car-aid-automotive-100063959868176/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon
                className="mx-2 hover:text-gray-500"
                fontSize="large"
              ></FacebookIcon>
            </a>
          </div>
        </Grid>

        <Grid className="pb-10" item xs={12} sm={6} md={4}>
          <Typography className="pb-5" variant="h6">
            <strong>About</strong>
          </Typography>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              About Us
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Shipping
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Returns
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Contact Us
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Reviews
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Privacy Policy
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Terms & Conditions
            </Button>
          </div>
        </Grid>

        <Grid className="pb-10" item xs={12} sm={6} md={4}>
          <Typography className="pb-5" variant="h6">
            <strong>Brands</strong>
          </Typography>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Audi
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Honda
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Hyundai
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Kia
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Mahindra
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Maruti Suzuki
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Tata
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Toyota
            </Button>
          </div>
          <div>
            <Button className="pb-5 hover:text-gray-500" variant="h6">
              Volkswagen
            </Button>
          </div>
        </Grid>

        <Grid className="pt-10 pb-2" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy; 2025 Caraid. All rights reserved.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Made with love by{" "}
            <a
              href="https://github.com/PrathB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong className="text-blue-400 hover:text-blue-600">
                PrathB
              </strong>
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;

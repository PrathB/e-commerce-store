import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div className="px-2">
      <Grid container spacing={3} className="py-1">
        {/* Avatar Section */}
        <Grid item xs={3} sm={2} md={1}>
          <Box display="flex" justifyContent="center">
            <Avatar
              className="text-white"
              sx={{
                width: { xs: 40, sm: 45, md: 50 },
                height: { xs: 40, sm: 45, md: 50 },
                bgcolor: "#7f0000",
              }}
            >
              P
            </Avatar>
          </Box>
        </Grid>

        {/* Review Content Section */}
        <Grid item xs={9} sm={10} md={9}>
          <div className="space-y-2">
            {/* User Info */}
            <div>
              <p className="text-left font-semibold text-lg">Pratham</p>
              <p className="text-left opacity-70">September 20, 2024</p>
            </div>

            {/* Rating Section */}
            <div className="text-left">
              <Rating value={4.5} precision={0.5} name="half-rating" readOnly />
            </div>

            {/* Review Text */}
            <p className="text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
              alias! Repellendus, facilis laboriosam? Cum quia fugit enim,
              incidunt eum molestiae quidem, exercitationem omnis laborum
              maiores magnam. Distinctio odit facilis maxime.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;

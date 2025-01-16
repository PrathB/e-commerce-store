import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";

const Achievement = () => {
  return (
    <Card sx={{ position: "relative", bgcolor: "#2c2c2c", color: "white" }}>
      <CardContent >
        <Typography
          variant="h5"
          sx={{ letterSpacing: ".25px", fontWeight: "bold" }}
        >
          Caraid
        </Typography>
        <Typography variant="body2">Congratulations</Typography>
        <Typography variant="h5" sx={{ my: 3 }}>
          420.8K
        </Typography>

        <Button size="small" variant="contained">
          View Sales
        </Button>
      </CardContent>
    </Card>
  );
};

export default Achievement;

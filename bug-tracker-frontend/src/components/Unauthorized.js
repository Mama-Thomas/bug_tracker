import React from "react";
import { Container, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1">
        You do not have the necessary permissions to access this page.
      </Typography>
    </Container>
  );
};

export default Unauthorized;

import { Container, Typography } from '@mui/material';
import React from 'react';

const Banner = () => {
  return (
    <Container className="dashboard--banner">
      <div>
        <Typography
          variant="h6"
          style={{ marginBottom: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
        >
          Top Currencies past 7d
        </Typography>
      </div>
    </Container>
  );
};

export default Banner;

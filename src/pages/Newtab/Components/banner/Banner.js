import { Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <Container className="dashboard--banner">
      <div>
        <Typography
          variant="h6"
          style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
        >
          Trending Coins
        </Typography>
      </div>
      <Carousel />
    </Container>
  );
};

export default Banner;

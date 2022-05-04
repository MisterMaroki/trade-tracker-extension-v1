import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';

const BannerContainer = styled(Container)`
  max-width: none !important;
`;
const Banner = () => {
  return (
    <BannerContainer>
      <div>
        <Typography
          variant="h6"
          style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
        >
          Trending Coins
        </Typography>
      </div>
      <Carousel />
    </BannerContainer>
  );
};

export default Banner;

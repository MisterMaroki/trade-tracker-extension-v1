import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import React from 'react';
import {
  primarybg,
  CarouselContainer,
  typographySx,
} from '../../styles/themeVariables';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <CarouselContainer>
      <div>
        <Typography variant="h6" style={typographySx}>
          Trending Coins
        </Typography>
      </div>
      <Carousel />
    </CarouselContainer>
  );
};

export default Banner;

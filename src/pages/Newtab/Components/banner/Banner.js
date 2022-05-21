import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import React from 'react';
import {
  primarybg,
  SectionContainer,
  typographySx,
} from '../../styles/themeVariables';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <SectionContainer>
      <div>
        <Typography variant="h6" style={typographySx}>
          Trending Coins
        </Typography>
      </div>
      <Carousel />
    </SectionContainer>
  );
};

export default Banner;

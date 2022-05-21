import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import React from 'react';
import { primarybg } from '../../styles/themeVariables';
import Carousel from './Carousel';

export const SectionContainer = styled(Container)`
  max-width: none !important;
  background: ${primarybg};
  border-radius: 2rem;
  padding: 1rem 0rem 2rem 0rem;
  margin-bottom: 2rem;
`;
const Banner = () => {
  return (
    <SectionContainer>
      <div>
        <Typography
          variant="h6"
          style={{
            margin: 15,
            marginTop: -5,
            fontWeight: 'bold',
            fontFamily: 'Ubuntu',
          }}
        >
          Trending Coins
        </Typography>
      </div>
      <Carousel />
    </SectionContainer>
  );
};

export default Banner;

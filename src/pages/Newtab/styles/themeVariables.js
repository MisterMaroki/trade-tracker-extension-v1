import styled from '@emotion/styled';
import { Box, Button, Container } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import variables from './variables.module.scss';
export const {
  fontbase,
  primarybg,
  primarytext,
  secondarybg,
  secondarytext,
  tertiary,
  tertiaryalt,
  white,
  black,
  lightgray,
  gray,
  lightbg,
  pink,
  blue,
  purple,
  yellow,
} = variables;
export const NewtabContainer = styled(Container)`
  width: 100%;
  max-width: 1800px !important;

  height: 100vh;
  margin: 0;
  padding: 0 !important;
  background-color: ${black};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionContainer = styled(Container)`
  max-width: none !important;
  background: ${primarybg};
  border-radius: 0.5rem;
  border: 1px solid ${lightbg};
  padding: 0 !important;
  margin-bottom: 2.5rem;
`;

export const GridItem = styled(SectionContainer)`
  height: 100%;
`;

export const DashboardContainer = styled(Container)`
  margin-top: 6rem;
  /* height: 88vh; */
  min-height: 88vh;
  /* max-height: none; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  margin-left: 2.5rem;
  max-width: 1800px !important;
`;

export const TradesContainer = styled(DashboardContainer)`
  margin: 0;
`;

export const CarouselContainer = styled(SectionContainer)`
  padding: 1rem 0 0 0 !important;
`;
export const CoinPageContainer = styled(DashboardContainer)`
  margin-inline: 0;
  margin-top: 3.5rem;
  padding: 0 !important;
`;
export const TradesPageContainer = styled(DashboardContainer)``;
export const CoinCard = styled(Box)`
  background: ${primarybg};
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid ${lightbg};
  max-width: 600px !important;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;
export const CoinPageCoinCard = styled(CoinCard)`
  height: 100%;
  width: 100%;
  margin: 0;
  max-width: none !important;
`;
export const Sidebar = styled(CoinPageCoinCard)`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  padding-top: 3rem;
  margin: 2rem;
`;

export const ChartContainer = styled(CoinPageCoinCard)`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding-top: 3rem;
  padding-bottom: 0;
  background: unset;
`;

export const ColorButton = styled(Button)(({ theme }) => ({
  color: primarytext,
  backgroundColor: 'none',
  '&:hover': {
    backgroundColor: '#09111b',
  },
}));

export const linearProgressSx = {
  backgroundColor: primarybg,
  '& .MuiLinearProgress-bar': {
    backgroundColor: tertiaryalt,
  },
};

export const typographySx = {
  margin: 15,
  marginTop: 0,
  fontWeight: 'bold',
  fontFamily: 'Ubuntu',
};

export const textFieldSx = () => {
  const { currentColor } = CryptoState();
  return {
    marginBottom: 0,
    width: '100%',
    maxWidth: '300px',
    padding: 0,

    input: {
      background: secondarybg,
      borderRadius: 1,
      color: currentColor,
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: currentColor,
      },
    },
    '& label.Mui-focused': {
      color: currentColor,
    },
    '& label': {
      color: primarytext,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: currentColor,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'trnsparent',
      },
      '&:hover fieldset': {
        borderColor: currentColor,
      },
      '&.Mui-focused fieldset': {
        borderColor: currentColor,
      },
    },
  };
};

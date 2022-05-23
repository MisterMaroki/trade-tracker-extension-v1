import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
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
} = variables;

export const SectionContainer = styled(Container)`
  max-width: none !important;
  background: ${primarybg};
  border-radius: 0.5rem;
  border: 1px solid ${lightbg};
  padding: 0 !important;
  margin-bottom: 2.5rem;
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
export const CoinPageContainer = styled(DashboardContainer)``;
export const TradesPageContainer = styled(DashboardContainer)``;
export const CoinCard = styled(Container)`
  background: ${primarybg};
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid ${lightbg};
  max-width: 600px !important;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;
export const Sidebar = styled(CoinCard)`
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

export const ChartContainer = styled(Sidebar)`
  width: 100%;
`;

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

export const textFieldSx = {
  marginBottom: 0,
  width: '100%',
  maxWidth: '300px',
  padding: 0,

  input: {
    background: secondarybg,
    borderRadius: 1,
    color: tertiaryalt,
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: tertiaryalt,
    },
  },
  '& label.Mui-focused': {
    color: tertiary,
  },
  '& label': {
    color: primarytext,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: tertiary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'trnsparent',
    },
    '&:hover fieldset': {
      borderColor: tertiaryalt,
    },
    '&.Mui-focused fieldset': {
      borderColor: tertiary,
    },
  },
};

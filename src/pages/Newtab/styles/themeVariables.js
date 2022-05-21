import styled from '@emotion/styled';
import { Button, ButtonBase, Container } from '@mui/material';
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
  padding: 1rem 0rem 2rem 0rem;
  margin-bottom: 2rem;
`;
export const CoinCard = styled(Container)`
  max-width: none !important;
  background: ${primarybg};
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid ${lightbg};
  max-width: 600px !important;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;

export const ColorButton = styled(Button)(({ theme }) => ({
  color: primarytext,
  backgroundColor: 'none',
  '&:hover': {
    backgroundColor: '#09111b',
  },
}));

export const typographySx = {
  margin: 15,
  marginTop: 0,
  fontWeight: 'bold',
  fontFamily: 'Ubuntu',
};

export const textFieldSx = {
  marginBottom: 0,
  width: '100%',
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

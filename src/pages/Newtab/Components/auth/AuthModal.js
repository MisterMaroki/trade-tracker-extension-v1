import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AppBar, Avatar, Tab, Tabs } from '@mui/material';
import {
  ColorButton,
  primarybg,
  primarytext,
} from '../../styles/themeVariables';
import { UserState } from '../../UserContext';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '5px',
  background: primarytext,

  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);
  const { initFirebaseApp } = UserState();

  const [value, setValue] = React.useState('login');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ColorButton onClick={toggleOpen}>Login</ColorButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar position="static" style={{ background: 'transparent' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="modal tabs"
              >
                <Tab value="login" label="Login" sx={{ color: 'white' }} />
                <Tab value="signup" label="Sign Up" sx={{ color: 'white' }} />
              </Tabs>
            </AppBar>
            {value === 'login' ? (
              <Login toggleOpen={toggleOpen} />
            ) : (
              <SignUp toggleOpen={toggleOpen} />
            )}
            <Box className="google">
              <span style={{ color: 'darkgrey' }}>OR</span>
              <GoogleButton
                style={{ width: '90%', outline: 'none', borderRadius: '1px' }}
                onClick={initFirebaseApp}
              >
                Google
              </GoogleButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
{
  /* <ColorButton onClick={handleOpen} onClick={initFirebaseApp}>Login</ColorButton> */
}

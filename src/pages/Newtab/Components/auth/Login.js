import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { ColorButton, textFieldSx } from '../../styles/themeVariables';
import { UserState } from '../../UserContext';

const Login = ({ toggleOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAlert } = UserState();
  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fil all the fields',
        type: 'error',
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(
        '🚀 ~ file: SignUp.js ~ line 29 ~ handleSubmit ~ result',
        result
      );
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result?.user?.email}`,
        type: 'success',
      });
      toggleOpen();
    } catch (error) {
      setAlert({ open: true, message: error.message, type: 'error' });
    } // toggleOpen();
  };

  return (
    <Box
      p={3}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button onClick={handleSubmit}>Login</Button>
    </Box>
  );
};

export default Login;

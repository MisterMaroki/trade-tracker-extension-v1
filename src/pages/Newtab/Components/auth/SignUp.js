import { Box, Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { ColorButton, textFieldSx } from '../../styles/themeVariables';
import { UserState } from '../../UserContext';

const SignUp = ({ toggleOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setAlert } = UserState();
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'password do not match.',
        type: 'error',
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(
        '🚀 ~ file: SignUp.js ~ line 29 ~ handleSubmit ~ result',
        result
      );
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result?.user?.email}`,
        type: 'success',
      });
      toggleOpen();
    } catch (error) {
      setAlert({ open: true, message: error.message, type: 'error' });
    }
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button onClick={handleSubmit}>Sign Up</Button>
    </Box>
  );
};

export default SignUp;

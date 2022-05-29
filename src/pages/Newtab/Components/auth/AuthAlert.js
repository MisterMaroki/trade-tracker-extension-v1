import { Close } from '@mui/icons-material';
import { Button, IconButton, Snackbar } from '@mui/material';
import React from 'react';
import { UserState } from '../../UserContext';
import Alert from '@mui/material/Alert';

const AuthAlert = () => {
  const { alert, setAlert } = UserState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        // message={alert.message}
      >
        <Alert
          onClose={handleClose}
          elevation={10}
          variant="filled"
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthAlert;

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CryptoState } from '../CryptoContext';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarButton({ direction, func, quantity, ticker }) {
  const [open, setOpen] = React.useState(false);
  const { setShowTrades, setId } = CryptoState();

  const handleClick = () => {
    func(direction);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <button
        className={`direction-tag }`}
        style={{ backgroundColor: direction === 'buy' ? 'green' : 'red' }}
        onClick={handleClick}
      >
        {direction === 'buy' ? 'Buy' : 'Sell'}
      </button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={quantity > 0 ? 'success' : 'error'}
          sx={{
            width: '100%',
            cursor: 'pointer',
            backgroundColor: direction === 'buy' ? 'green' : 'red',
          }}
          onClick={() => {
            setShowTrades(true);
            setId('');
          }}
        >
          {quantity > 0
            ? `Trade Placed: ${direction.toUpperCase()} ${quantity} ${ticker.toUpperCase()}`
            : 'Error: Cannot trade sub-zero amount!'}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

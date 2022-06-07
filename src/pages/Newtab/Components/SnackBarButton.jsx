import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CryptoState } from '../CryptoContext';
import { ColorButton } from '../styles/themeVariables';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarButton({ direction, func, quantity, ticker }) {
  const [open, setOpen] = React.useState(false);
  const { setShowTrades, setId, setQuantity } = CryptoState();
  const [tapped, setTapped] = React.useState(false);

  const handleClick = () => {
    if (tapped) {
      func(direction, quantity);
      setOpen(true);
      setTapped(false);
    }
  };

  React.useEffect(() => {
    setTapped(false);
  }, [quantity, direction]);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <ColorButton
        className={`direction-tag }`}
        style={{
          backgroundColor: direction === 'buy' ? 'green' : 'red',
          height: '38px',
          marginTop: '2px',
        }}
        onClick={() => {
          setTapped(!tapped);
          handleClick();
        }}
      >
        {tapped ? 'Confirm' : direction === 'buy' ? 'Buy' : 'Sell'}
      </ColorButton>
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
            ? `Trade Placed: ${direction.toUpperCase()} ${+quantity} ${ticker.toUpperCase()}`
            : 'Error: Cannot trade sub-zero amount!'}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

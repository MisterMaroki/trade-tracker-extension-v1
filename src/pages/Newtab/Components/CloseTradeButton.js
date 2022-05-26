import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CryptoState } from '../CryptoContext';
import { ColorButton } from '../styles/themeVariables';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  DeleteOutlined,
  DoNotDisturbOnTotalSilenceOutlined,
  Rule,
} from '@mui/icons-material';
import { Chip } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CloseTradeButton({ trade }) {
  const {
    setShowTrades,
    setId,
    setQuantity,
    filter,
    closeTrade,
    trades,
    notify,
  } = CryptoState();
  const [tapped, setTapped] = React.useState(() => trade.active || false);

  const handleClick = (event) => {
    event.stopPropagation();
    setTapped(!tapped);
    if (tapped) {
      closeTrade(trade);
      notify();
      setTapped(false);
    }
  };

  React.useEffect(() => {
    setTapped(false);
  }, [trades]);

  return (
    <>
      {
        <Chip
          label={
            trade.active
              ? tapped
                ? 'Confirm'
                : 'Close'
              : trade.value > trade.invested
              ? 'Closed with prof'
              : trade.value === trade.invested
              ? 'Closed at BE'
              : 'Closed with loss'
          }
          color="primary"
          icon={
            trade.active ? (
              <DeleteOutlined />
            ) : trade.value > trade.invested ? (
              <ArrowCircleUp />
            ) : trade.value === trade.invested ? (
              <DoNotDisturbOnTotalSilenceOutlined />
            ) : (
              <ArrowCircleDown />
            )
          }
          size="small"
          onClick={handleClick}
          style={{ transform: trade.active ? 'none' : 'translateX(-20px)' }}
        />
      }
    </>
  );
}

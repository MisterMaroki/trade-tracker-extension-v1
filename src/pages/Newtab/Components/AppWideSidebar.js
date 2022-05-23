import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  lightbg,
  primarybg,
  secondarybg,
  tertiaryalt,
} from '../styles/themeVariables';
import { CryptoState } from '../CryptoContext';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {
  DataThresholding,
  Home,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRight,
  PriceChange,
} from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: primarybg,
  border: `1px solid ${lightbg}`,
  color: tertiaryalt,
  fontWeight: '500',
  textTransform: 'uppercase',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
  background: primarybg,
  border: `1px solid ${lightbg}`,
  color: tertiaryalt,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function AppWideSidebar({ children }) {
  const {
    search,
    setSearch,
    setId,
    showTrades,
    setShowTrades,
    coins,
    handleSearch,
    id,
    setPage,
    handleFilter,
    filter,
  } = CryptoState();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const decideBackground = (index) => {
    switch (index) {
      case 0:
        return !showTrades && !id ? tertiaryalt : primarybg;
        break;
      case 1:
        return showTrades && !id && filter !== 'closed'
          ? tertiaryalt
          : primarybg;
        break;
      case 2:
        return showTrades && !id && filter === 'closed'
          ? tertiaryalt
          : primarybg;
        break;
      default:
        return;
    }
  };
  useEffect(() => {
    showTrades ? handleDrawerOpen() : handleDrawerClose();
  }, [showTrades]);
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{ marginTop: '5rem' }}>
          <ListItem
            disablePadding
            sx={{
              display: 'block',
              backgroundColor: primarybg,
              color: tertiaryalt,
              '&:hover': {
                backgroundColor: secondarybg,
                color: tertiaryalt,
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
            >
              {open ? (
                <KeyboardDoubleArrowLeft />
              ) : (
                <KeyboardDoubleArrowRight />
              )}
            </ListItemButton>
          </ListItem>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Active Trades', 'Trade History'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                display: 'block',
                backgroundColor: decideBackground(index),
                color:
                  decideBackground(index) === tertiaryalt
                    ? primarybg
                    : tertiaryalt,
                '&:hover': {
                  backgroundColor: secondarybg,
                  color: tertiaryalt,
                },
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  setId('');
                  index === 0 && handleDrawerClose();
                  switch (index) {
                    case 0:
                      setShowTrades(false);
                      break;
                    case 1:
                    case 2:
                      setShowTrades(true);
                      handleFilter(index === 1 ? 'all' : 'closed');
                      break;
                    default:
                      return;
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'unset',
                  }}
                >
                  {index === 0 ? (
                    <Home />
                  ) : index === 1 ? (
                    <PriceCheckIcon />
                  ) : (
                    <PriceChange />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, fontSize: '14px !important' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Account Overview', 'Support'].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                display: 'block',
                '&:hover': {
                  backgroundColor: secondarybg,
                },
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'unset',
                  }}
                >
                  {index === 0 ? <DataThresholding /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {children}
    </>
    // </Box>
  );
}

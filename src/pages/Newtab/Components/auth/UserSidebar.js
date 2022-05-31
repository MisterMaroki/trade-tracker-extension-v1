import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
import { ColorButton, SignOutButton } from '../../styles/themeVariables';
import { Avatar, IconButton } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { UserState } from '../../UserContext';
import CoinItem from '../cards/CoinItem';
import WatchlistCoinItem from '../cards/WatchlistCoinItem';
import FadeIn from 'react-fade-in';

export default function UserSidebar() {
  const { user, loggedIn, signOut, setAlert, watchlist } = UserState();

  const { coins } = CryptoState();

  const { currentColor } = CryptoState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = () => (event) => {
    setState({ ...state, right: !state.right });
  };
  const logOut = () => {
    signOut();
    setAlert({
      open: true,
      message: 'You have been logged out.',
      type: 'success',
    });
    setState({ right: false });
  };

  return (
    <>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {loggedIn && (
            <IconButton
              onClick={toggleDrawer(anchor, true)}
              style={{
                position: 'fixed',
                top: '5rem',
                right: '-5px',
                borderRadius: '10px 0 0 10px',
              }}
              className="carousel"
            >
              <KeyboardDoubleArrowLeft style={{ color: currentColor }} />
            </IconButton>
          )}

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              className="carousel flex col sidebar"
              style={{
                width: '400px',
                height: '100%',
                zIndex: '99999',
                borderRadius: 0,
                paddingTop: '100px',
              }}
            >
              <ColorButton onClick={toggleDrawer()} className="carousel">
                Close
              </ColorButton>
              <div className="profile">
                <Avatar
                  src={user?.photoURL}
                  alt={user?.displayName || user?.email}
                  sx={{
                    background: 'none',
                    width: '90px !important',
                    height: '90px !important',
                    margin: '1rem auto',
                  }}
                />
                <h6>{user?.displayName || user?.email}</h6>
                <span className="watchlist-title">Watchlist</span>
                <div
                  className="watchlist flex col"
                  style={{
                    height: '75%',
                    paddingBlock: '2rem',
                    overflowY: 'scroll',
                    justifyContent: 'flex-start',
                    marginTop: '1rem',
                  }}
                >
                  <FadeIn className="flex col sidebar">
                    {watchlist &&
                      watchlist?.map((item, index) => (
                        <WatchlistCoinItem
                          row={coins?.filter((x) => x.id === item.id)[0]}
                          price={item.price}
                        />
                      ))}
                  </FadeIn>
                </div>
              </div>
              <div>
                <SignOutButton onClick={logOut}>Sign Out</SignOutButton>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}

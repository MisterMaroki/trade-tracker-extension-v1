// import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
// import { Box, Fade } from '@mui/material';
// import React, { useState } from 'react';

// const UserSidebar = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Box
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         top: '4rem',
//         right: '10px',
//         border: '1px solid red',
//         height: '100%',
//       }}
//     >
//       {!open ? (
//         <KeyboardDoubleArrowLeft onClick={() => setOpen(!open)} />
//       ) : (
//         <Fade in={open}>
//           <Box>UserSidebar</Box>
//         </Fade>
//       )}
//     </Box>
//   );
// };

// export default UserSidebar;

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
import { ColorButton } from '../../styles/themeVariables';
import { Avatar, IconButton } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { UserState } from '../../UserContext';

export default function UserSidebar() {
  const { user, initFirebaseApp, loggedIn, signOut, setAlert } = UserState();

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
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {loggedIn && (
            <IconButton
              onClick={toggleDrawer(anchor, true)}
              style={{ position: 'absolute', top: '5rem', right: '-5px' }}
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
                    margin: '0 auto',
                  }}
                />
                <h6>{user?.displayName || user?.email}</h6>
                <div className="watchlist">
                  <span className="watchlist-title">Watchlist</span>
                </div>
              </div>
              <div>
                <ColorButton onClick={logOut}>Sign Out</ColorButton>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

import React from 'react';
// import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

function Nav() {

  // // Material UI
  const useStyles = makeStyles({
    list: {
      width: "13em",
      backgroundColor: '#97f3fb',
    },
    text: {
      color: '#000'
    }
  });

  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  // // End Material UI

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }
  
  let list = (
    <div className={classes.list}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      role="presentation"
    >
      <List>
        <ListItem>
          <Link
            className={classes.text}
            component="button"
            variant="body1"
            onClick={() => { history.push('/home') }}
          >
            Home
          </Link>
        </ListItem>

        <Divider />

        <ListItem>
          <Link
            className={classes.text}
            component="button"
            variant="body1"
            onClick={() => { history.push('/about') }}
          >
            About
          </Link>
        </ListItem>
      </List>
    </div>
  )

  if (user.id != null) {
    list = (
      <div
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">

        <List>
          <ListItem>
            Welcome, {user.username}!
          </ListItem>

          <Divider />

          <ListItem>
            <Link
              className={classes.text}
              component="button"
              variant="body1"
              onClick={() => { history.push('/home') }}
            >
              Home
            </Link>
          </ListItem>

          <Divider /> 

          <ListItem>
            <Link
              className={classes.text}
              component="button"
              variant="body1"
              onClick={() => { history.push('/info') }}
            >
              Info Page
            </Link>
          </ListItem>

          <Divider />

          <ListItem>
            <Link
              className={classes.text}
              component="button"
              variant="body1"
              onClick={() => { history.push('/about') }}
            >
              About
            </Link>
          </ListItem>

          <Divider />

          <ListItem onClick={() => dispatch({ type: 'LOGOUT' })}>
            {/* <LogOutButton className="navLink" /> */}
              Log Out
          </ListItem>
        </List>
      </div>
    )
  }
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">EtherFrolics</h2>
     </Link>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
        {list}
      </Drawer>
    </div>
  );

  // return (
  //   <div className="nav">
  //     <Link to="/home">
  //       <h2 className="nav-title">EtherFrolics</h2>
  //     </Link>
  //     <div>
  //       <Link className="navLink" to={loginLinkData.path}>
  //         {loginLinkData.text}
  //       </Link>

  //       {user.id && (
  //         <>
  //           <Link className="navLink" to="/info">
  //             Info Page
  //           </Link>
  //           <LogOutButton className="navLink" />
  //         </>
  //       )}

  //       <Link className="navLink" to="/about">
  //         About
  //       </Link>
  //     </div>
  //   </div>
  // );
}

export default Nav;

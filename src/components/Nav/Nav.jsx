import React from 'react';
// import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HealingIcon from '@material-ui/icons/Healing';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

function Nav() {

  // // Material UI
  const useStyles = makeStyles({
    list: {
      width: "13em",
      backgroundColor: '#7fbf7f',
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
        <ListItem onClick={() => { history.push('/home') }} className="mouse">
          <HomeIcon />
          Home
        </ListItem>

        <Divider />

        <ListItem onClick={() => { history.push('/about') }} className="mouse">
          <InfoIcon />
          About
        </ListItem>

        <Divider />

        <ListItem onClick={() => dispatch({ type: 'LOGOUT', pushToHome: pushToHome })} className="mouse">
          <ExitToAppIcon />
          Log Out
        </ListItem>
      </List>
    </div>
  )

  if (user.authorization === 1) {
    list = (
      <div
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">

        <List>
          <ListItem className="mouse menu-welcome">
            Welcome, {user.username}!
          </ListItem>

          <Divider />

          <ListItem className="mouse" onClick={() => { history.push('/home') }} className="mouse">
            <HomeIcon />
            Home
          </ListItem>

          <Divider />

          <ListItem className="mouse" onClick={() => { history.push('/missions') }} className="mouse">
            <HealingIcon />
            Missions
          </ListItem>

          <Divider />

          <Divider />

          <ListItem onClick={() => dispatch({ type: 'LOGOUT', pushToHome: pushToHome })} className="mouse">
            <ExitToAppIcon />
            Log Out
          </ListItem>
        </List>
      </div>
    )
  }

  else if (user.authorization === 100) {
    list = (
      <div
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">

        <List>
          <ListItem onClick={() => { history.push('/home') }} className="mouse">
            <HomeIcon />
            Home
          </ListItem>

          <Divider />

          <ListItem onClick={() => { history.push('/providermgmt') }} className="mouse">
            <SupervisedUserCircleIcon />
            Provider Management
          </ListItem>

          <Divider />

          <ListItem onClick={() => { history.push('/missions') }} className="mouse">
            <HealingIcon />
            Missions
          </ListItem>

          <Divider />

          <ListItem onClick={() => { history.push('/createmissionpage') }} className="mouse">
            <AddCircleOutlineIcon />
            Create Mission
          </ListItem>

          <Divider />

          <ListItem onClick={() => dispatch({ type: 'LOGOUT', pushToHome: pushToHome })} className="mouse">
            <ExitToAppIcon />
            Log Out
          </ListItem>
        </List>
      </div>
    )
  }

  function pushToHome() {

    history.push('/');
  }

  return (
    <div className="nav">
      <div className="nav-title">
        <h2 className="nav-title" onClick={() => { history.push('/home') }}>EtherFrolics</h2>
      </div>
      <div className="leftSide">
        <IconButton onClick={toggleDrawer}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </div>
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
        {list}
      </Drawer>
    </div>
  );
}

export default Nav;

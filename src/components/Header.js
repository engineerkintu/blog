import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  MenuItem, ListItemAvatar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
        </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
        </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
        </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedOutViewButton = props => {
  if (!props.currentUser) {
    return (
      <List disabledPadding dense>
        <ListItem button>
          <ListItemText>
            <Link to="/">Home</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="/login">Sign in</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="register">Sign up</Link>
          </ListItemText>
        </ListItem>
      </List>

    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
        </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
        </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>

    );
  }

  return null;
};

const LoggedInViewButton = props => {
  if (props.currentUser) {
    return (
      <List disabledPadding dense>
        <ListItem button>
          <ListItemText>
            <Link to="/" className="nav-link">
              Home
        </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="/editor" className="nav-link">
              <i className="ion-compose"></i>&nbsp;New Post
        </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="/settings" className="nav-link">
              <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link
              to={`/@${props.currentUser.username}`}
              className="nav-link">

              {props.currentUser.username}
            </Link>
          </ListItemText>
          <ListItemAvatar>
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
          </ListItemAvatar>
        </ListItem>
      </List>
    );
  }

  return null;
};

export default function Header(props) {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 768
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getDrawerChoices()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getMenuButtons()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {

    return (

      <div className="container">
        <LoggedOutView currentUser={props.currentUser} />

        <LoggedInView currentUser={props.currentUser} />
      </div>
    );

  };
  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>

      <Link to="/" className="navbar-brand">
        {props.appName.toLowerCase()}
      </Link>
    </Typography>
  );

  const getMenuButtons = () => {

    return (
      <div>
        <Button to="/" className="menuButton">
          {props.appName.toLowerCase()}
        </Button>
        <LoggedOutViewButton currentUser={props.currentUser} />

        <LoggedInViewButton currentUser={props.currentUser} />

      </div>

    );

  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
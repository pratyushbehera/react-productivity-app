import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import ThemeContext from './context/ThemeContext';

import { getToken, removeUserSession } from './Utils/Common';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLight: {
    backgroundColor: '#43a047'
  },
  navDark: {
    backgroundColor: '#212121'
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const handleLogout = () => {
    setAnchorEl(null);
    removeUserSession();
    props.history.push('/');
  }

  const goBack = () => {
    props.history.goBack();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { dark, toggle } = useContext(ThemeContext);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={dark ? classes.navDark : classes.navLight}>
        <Toolbar>
          {getToken() ?
            <IconButton
              aria-label="back button"
              color="inherit"
              onClick={goBack}
            > <Icon>arrow_backward</Icon>
            </IconButton> : null}
          <Link to="/" className={classes.title} style={{ 'textDecoration': 'none', 'color': '#ffffff' }}>
            <Typography variant="h6" >
              Productivity
            </Typography>
          </Link>
          <IconButton
            aria-label="toggle dark theme"
            onClick={toggle}
            color="inherit"
          >
            {dark ? <Icon>brightness_5</Icon> : <Icon>brightness_4</Icon>}
          </IconButton>
          {
            getToken() ?
              (
                <>
                  <Button color="inherit" aria-controls="profile"
                    aria-haspopup="true" onClick={handleClick}>
                    <Avatar>{props.user && props.user.userName && props.user.userName.charAt(0)}</Avatar>
                  </Button>
                  <Menu
                    id="profile"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>

                      <Link to="/profile" style={{ 'textDecoration': 'none', 'color': '#000000' }}>
                        My profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Link to="/" style={{ 'textDecoration': 'none', 'color': '#000000' }}>
                        Logout
                      </Link>
                    </MenuItem>
                  </Menu>
                </>
              )
              :
              null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar);
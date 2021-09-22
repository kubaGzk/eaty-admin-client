import React from 'react';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
// import Notifications from '@material-ui/icons/Notifications';
// import Dashboard from '@material-ui/icons/Dashboard';
// import Search from '@material-ui/icons/Search';
// // core components
// import CustomInput from '../CustomInput/CustomInput';
import Button from '../CustomButtons/Button';

import styles from '../../../assets/jss//material-dashboard-react/components/headerLinksStyle';
import { useAppDispatch } from '../../../hooks';
import { logout } from '../../../store/auth';

const useStyles = makeStyles(styles);

const AdminNavbarLinks: React.FC = () => {
  const classes: any = useStyles();

  const dispatch = useAppDispatch();


  const [openProfile, setOpenProfile] = React.useState<any>(null);

  const handleClickProfile = (event: any) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleLogout = () => {
    setOpenProfile(null);
    dispatch(logout({}));
  };

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            ' ' +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role='menu'>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
};

export default AdminNavbarLinks;

// {/* <div className={classes.searchWrapper}>
// <CustomInput
//   formControlProps={{
//     className: classes.margin + ' ' + classes.search,
//   }}
//   inputProps={{
//     placeholder: 'Search',
//     inputProps: {
//       'aria-label': 'Search',
//     },
//   }}
// />
// <Button color='white' aria-label='edit' justIcon round>
//   <Search />
// </Button>
// </div>
// <Button
// color={window.innerWidth > 959 ? 'transparent' : 'white'}
// justIcon={window.innerWidth > 959}
// simple={!(window.innerWidth > 959)}
// aria-label='Dashboard'
// className={classes.buttonLink}
// >
// <Dashboard className={classes.icons} />
// <Hidden mdUp implementation='css'>
//   <p className={classes.linkText}>Dashboard</p>
// </Hidden>
// </Button> */}

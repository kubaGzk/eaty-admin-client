import * as React from 'react';
import classNames from 'classnames';
import DropdownIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';
import styles from '../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import Button from '../Template/CustomButtons/Button';

export interface TableDropdownOption {
  name: string;
  cb: () => void;
}

export interface TableDropdownProps {
  name?: string;
  options: TableDropdownOption[];
}

const useStyles = makeStyles(styles);

const TableDropdown: React.FC<TableDropdownProps> = (props) => {
  const { name, options } = props;

  const classes: any = useStyles();

  const [openDropdown, setOpenDropdown] = React.useState<null | HTMLElement>(
    null,
  );

  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    if (openDropdown && openDropdown.contains(event.currentTarget)) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(event.currentTarget);
    }
  };
  const handleCloseDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openDropdown ? 'Dropdown-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleClickDropdown}
          className={classes.buttonLink}
        >
          <DropdownIcon className={classes.icons} />
          <span>{name}</span>
          {/* <Hidden mdUp implementation='css'>
            <p onClick={handleCloseDropdown} className={classes.linkText}>
              {name}
            </p>
          </Hidden> */}
        </Button>
        <Popper
          open={Boolean(openDropdown)}
          anchorEl={openDropdown}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openDropdown }) +
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
                <ClickAwayListener onClickAway={handleCloseDropdown}>
                  <MenuList role='menu'>
                    {options.map(({ name, cb }, key) => (
                      <MenuItem
                        onClick={() => {
                          handleCloseDropdown();
                          cb();
                        }}
                        className={classes.dropdownItem}
                        key={key}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default TableDropdown;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from '../components/Template/Navbars/Navbar';



import Sidebar from '../components/Template/Sidebar/Sidebar';
// import FixedPlugin from '../components/Template/FixedPlugin/FixedPlugin';
import bgImage from '../assets/img/sidebar-2.jpg';

import routes from '../routes';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle';

import logo from '../assets/img/fast-food.png';

let ps: PerfectScrollbar;

const useStyles = makeStyles(styles);

const Admin: React.FC = (props) => {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef<HTMLDivElement>();
  // states and functions

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current!, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Eaty Admin'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        {...props}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...props}
        />
        {
          <div className={classes.content}>
            <div className={classes.container}>
              {
                <Switch>
                  {routes.map((prop: any, key) => {
                    if (prop.layout === '/admin') {
                      return (
                        <Route
                          path={prop.path}
                          component={prop.component}
                          key={key}
                        />
                      );
                    }
                    return null;
                  })}
                  <Redirect from='/' to='/dashboard' />
                </Switch>
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Admin;

//UNUSED

// const [image, setImage] = React.useState(bgImage);
// const [color, setColor] = React.useState('blue');
// const [fixedClasses, setFixedClasses] = React.useState('dropdown show');
// const handleImageClick = (image: string) => {
//   setImage(image);
// };
// const handleColorClick = (color: string) => {
//   setColor(color);
// };
// const handleFixedClick = () => {
//   if (fixedClasses === 'dropdown') {
//     setFixedClasses('dropdown show');
//   } else {
//     setFixedClasses('dropdown');
//   }
// };
//    <FixedPlugin
//   handleImageClick={handleImageClick}
//   handleColorClick={handleColorClick}
//   bgColor={color}
//   bgImage={image}
//   handleFixedClick={handleFixedClick}
//   fixedClasses={fixedClasses}
// />

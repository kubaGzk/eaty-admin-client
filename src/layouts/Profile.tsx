import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle';
import Login from '../views/Login/Login';
import Reset from '../views/Reset/Reset';

const useStyles = makeStyles(styles);
const Profile: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Switch>
          <Route path={'/login'} component={Login} />
          <Route path={'/reset/:tkn'} component={Reset} />
          <Redirect to='/login' />
        </Switch>
      </div>
    </div>
  );
};

export default Profile;

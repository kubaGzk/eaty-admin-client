import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Template/Grid/GridItem';
import GridContainer from '../../components/Template/Grid/GridContainer';
import CustomInput from '../../components/Template/CustomInput/CustomInput';
import Button from '../../components/Template/CustomButtons/Button';
import Card from '../../components/Template/Card/Card';
import CardHeader from '../../components/Template/Card/CardHeader';

import CardBody from '../../components/Template/Card/CardBody';
import CardFooter from '../../components/Template/Card/CardFooter';

import { InputAdornment } from '@material-ui/core';
import { CircularProgress, IconButton } from 'material-ui';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useAppDispatch, useForm } from '../../hooks';
import { useQuery } from '../../graphql/hooks';
import { LOGIN } from '../../graphql/queries';
import { login } from '../../store/auth';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  textCenter: {
    textAlign: 'center',
  },
  cardFooter: {
    justifyContent: 'center',
  },
});

export interface LoginForm {
  username: { type: string; value: string };
  password: { type: string; value: string; hidden: boolean };
}

export interface LoginData {
  token: string;
  firstname: string;
  lastname: string;
  id: string;
  role: string[];
  username: string;
  email: string;
}

export interface QueryVariables {
  username: string;
  password: string;
}

const initialFormState = {
  username: { type: 'text', value: '' },
  password: { type: 'password', value: '', hidden: true },
};

const Login: React.FC = () => {
  const classes: any = useStyles();

  const dispatch = useAppDispatch();

  const { isLoading, fetchData, error } = useQuery<LoginData, QueryVariables>({
    query: LOGIN,
    fetchOnInit: false,
    onData: loginHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const { values, onChange, onSubmit, onHide } = useForm<LoginForm>(
    initialFormState,
    submitHandler,
  );

  function submitHandler(payload: LoginForm): void {
    fetchData({
      username: payload.username.value,
      password: payload.password.value,
    });
  }

  function loginHandler(data: { login: LoginData }): void {
    dispatch(login(data.login));
  }

  return (
    <div>
      <GridContainer justify='center'>
        <GridItem xs={8} sm={8} md={4}>
          <Card className={classes.textCenter}>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Login to your account</h4>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText='Username'
                      id='username'
                      formControlProps={{
                        required: true,
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.username.value,
                        name: 'username',
                        onChange: onChange,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText='Password'
                      id='password'
                      formControlProps={{
                        required: true,
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: values.password.hidden ? 'password' : 'text',
                        value: values.password.value,
                        name: 'password',
                        onChange: onChange,
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => onHide('password')}
                            >
                              {values.password.hidden ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <CardFooter className={classes.cardFooter}>
                  {error && <Alert severity='error'>{error}</Alert>}
                  {isLoading ? (
                    <CircularProgress size={40} />
                  ) : (
                    <Button color='primary' type='submit'>
                      Login
                    </Button>
                  )}
                </CardFooter>
              </CardBody>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Login;

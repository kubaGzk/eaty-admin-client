import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useQuery } from './graphql/hooks';
import { CHECK_TOKEN } from './graphql/queries';
import { useAppDispatch, useAppSelector } from './hooks';
import Admin from './layouts/Admin';
import Profile from './layouts/Profile';
import { login, startAuth, logout } from './store/auth';

export interface AuthData {
  firstname: string;
  lastname: string;
  id: string;
  role: string[];
  username: string;
  email: string;
}

const App = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState<boolean>(false);

  const localToken = localStorage.getItem('token') || '';

  const { fetchData } = useQuery({
    query: CHECK_TOKEN,
    onStart: () => {
      dispatch(startAuth);
    },
    onData: (data: { checkToken: AuthData }) => {
      console.log(data);

      dispatch(login({ ...data.checkToken, token: localToken }));
      setChecked(true);
    },
    onError: () => {
      dispatch(logout({}));
      setChecked(true);
    },
    authToken: localToken,
    fetchOnInit: false,
  });

  useEffect(() => {
    if (localToken && localToken.length > 0) {
      fetchData();
    } else {
      setChecked(true);
    }
  }, []);

  return (
    <>
      {checked &&
        (token ? (
          <Route path='/' component={Admin} />
        ) : (
          <Route path='/' component={Profile} />
        ))}
    </>
  );
};

export default App;

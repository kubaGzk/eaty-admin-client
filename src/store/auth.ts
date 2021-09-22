import {
  // AnyAction,
  createSlice,
  // ThunkAction,
  PayloadAction,
} from '@reduxjs/toolkit';

import { LoginData } from '../views/Login/Login';
// import { RootState } from './store';

export interface AuthState {
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  token: string | null;
  email: string | null;
  id: string | null;
  role: string[] | null;
  loading: boolean;
}

const initialState: AuthState = {
  username: null,
  firstname: null,
  lastname: null,
  token: null,
  email: null,
  id: null,
  role: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginData>) => {
      localStorage.setItem('token', action.payload.token);

      return { loading: false, ...action.payload };
    },
    logout: (state, action) => {
      localStorage.removeItem('token');
      return initialState;
    },
    startAuth: (state, action) => {
      return { ...state, loading: true };
    },
  },
});

const { login, logout, startAuth } = authSlice.actions;

// const checkAuth = (): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch) => {};
// };

export { login, logout, startAuth };

export default authSlice.reducer;

import { MuiThemeProvider } from 'material-ui/styles';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/css/material-dashboard-react.css';
import store from './store/store';

ReactDOM.render(
  // tslint:disable-next-line: jsx-wrap-multiline
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

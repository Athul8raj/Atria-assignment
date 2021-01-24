import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// const theme = createMuiTheme({
//   palette: {
//      primary: {
//         light: '#fff',
//         main: 'rgb(23, 105, 170)',
//         dark: '#000'
//      },
//      secondary: {
//        main: '#f44336',
//      },
//   },
//   typography: { 
//      useNextVariants: true
//   }
// });


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <MuiThemeProvider theme = { theme }> */}
    <App />
    {/* </MuiThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

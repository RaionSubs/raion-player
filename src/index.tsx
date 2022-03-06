import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./global.css";
import App from './App';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ReactTypes } from "./types/reactPages";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from "./helpers/theme";
import { SnackbarProvider } from "notistack";


function AppRenderMode(): ReactTypes {

  return (
    <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
  );

};

if (process.env.REACT_APP_DSN_URL) {
  Sentry.init({
    dsn: process.env.REACT_APP_DSN_URL,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

ReactDOM.render(<AppRenderMode />, document.getElementById("root"));


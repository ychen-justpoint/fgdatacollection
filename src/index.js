import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom'

import './index.css';
import App from './App';
import LoginPage from './login';
import reportWebVitals from './reportWebVitals';

import store from './app/store'
import { Provider } from 'react-redux'

import { MsalProvider, MsalAuthenticationTemplate,UnauthenticatedTemplate } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import msalConfig from './authConfig';
import { useMsal } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((message) => {
  if (message.eventType === 'loginSuccess') {
    
    // A successful login event occurred
    console.log('User logged in:', message.payload.account);

    //callApi();

  } else if (message.eventType === 'logoutSuccess') {
    
    // A successful logout event occurred
    console.log('User logged out');
  
  }
});

// const callApi = async () => {

//   const { instance,accounts } = useMsal();

//   const tokenResponse = await instance.acquireTokenSilent({
//     account: accounts[0],
//     scopes: ["api://8f3493cc-48b8-43f9-ba2f-2737850ff0a6/.default"],
//   });

//   console.log(tokenResponse);
// };

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <MsalAuthenticationTemplate>
            <App />
          </MsalAuthenticationTemplate>
          <UnauthenticatedTemplate>
            <LoginPage />
          </UnauthenticatedTemplate>
        </MsalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

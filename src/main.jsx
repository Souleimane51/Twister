// Libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import UserContextProvider from './context/userContext';
import TwistContextProvider from './context/twistContext';
import './index.css'
import ShowPopupContextProvider from './context/showPopupContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
      <TwistContextProvider>
        <ShowPopupContextProvider>
          <App />
        </ShowPopupContextProvider>
      </TwistContextProvider>
      </UserContextProvider> 
    </BrowserRouter>
  </React.StrictMode>,
)

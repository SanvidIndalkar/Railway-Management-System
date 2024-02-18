import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import UserContextProvider from './Contexts/UserContextProvider';
import StationContextProvider from './Contexts/StationContextProvider';
import UserSearchedTrainsProvider from "./Contexts/UserSearchedTrainsProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StationContextProvider>
        <UserSearchedTrainsProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </UserSearchedTrainsProvider>
    </StationContextProvider>
);


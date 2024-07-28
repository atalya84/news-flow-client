import { FC, useContext, useState } from 'react';
import logo from './logo.svg';
import './HomePage.css';
import { LoadingButton } from '@mui/lab';
import { type } from 'os';
import { getActiveUser } from '../../services/auth-service';
import { AuthContext } from '../../Context';

export const HomePage: FC = () => {

  const {user} = useContext(AuthContext)

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <LoadingButton
                className='login'
                loadingPosition="end"
                variant="contained"
            >
              {user?.name}
            </LoadingButton>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
};

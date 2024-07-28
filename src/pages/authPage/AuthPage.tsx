import './AuthStyle.css';

import Card from '@mui/material/Card';
import { FC, useCallback } from 'react';
import { FormProps } from '../../types/Props';
import { AuthForm } from './AuthForm';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import { registrUser, loginUser } from '../../services/auth-service';
// import { AuthContext } from '../../context/Context';
// import { registerGoogle, register } from '../../services/auth/AuthServices';


export const SignUpPage: FC = () => {
    return <Page type="Sign Up" onClick={registrUser} />;
};

export const LoginPage: FC = () => {
    const onGoogleLogin = useCallback(async (response: CredentialResponse) => {
      try {
        alert("hello google login")
      } catch (error) {
        console.error('Error logging in with Google:', error);
      }
    }, []);

    return <Page type="Login" onClick={loginUser} />;
};

const Page: FC<FormProps> = (formProps) => {
    const navigate = useNavigate();

    return (
        <div className="Page">
            <Card className="login-card">
                <AuthForm {...formProps} />
                <div className="right-side">
                  <img src='/papers.jpg'/>
                </div>
            </Card>
        </div>
    );
};
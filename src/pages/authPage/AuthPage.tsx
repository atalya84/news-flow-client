import './AuthStyle.css';

import Card from '@mui/material/Card';
import { FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { FormProps } from '../../types/Props';
import { AuthForm } from './AuthForm';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import { FieldValidation } from '../../types/Auth';
import { IUser } from '../../types/User';
import apiClient from '../../services/api-client';
import axios from 'axios';
// import { AuthContext } from '../../context/Context';
// import { registerGoogle, register } from '../../services/auth/AuthServices';


export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [passwordValid, setPasswordValid] = useState<FieldValidation>({ isValid: true, errorText: '' });

    const onSignUp = useCallback(async (user: IUser) => {
        try{
            console.log("Registering user...")
            apiClient.post("/auth/register", user).then((response) => {
                console.log("register successfuly new user:", response)
                navigate('/')
            })
        } catch (error) {
            console.log("my error", error)
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                console.log("Caught 400 error:", error.response.data);
                setEmailValid({ isValid: false, errorText: 'Email already exists' })
            } else {
                console.error('Error logging in:', error);
                throw error;
            }
        }
    }, []);

    return <Page type="Sign Up" onClick={onSignUp} emailValid={emailValid} setEmailValid={setEmailValid} passwordValid={passwordValid} setPasswordValid={setPasswordValid} />;
};

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [passwordValid, setPasswordValid] = useState<FieldValidation>({ isValid: true, errorText: '' });

    const onLogin = useCallback(async (user: IUser) => {
        try {
            console.log("Registering user...")
            console.log(user)
            apiClient.post("/auth/login", user).then((response) => {
                console.log("logged in user:", response)
                navigate('/')
            })
        }  catch (error) {
            console.error('Error logging in:', error);
        }
    }, []);

    const onGoogleLogin = useCallback(async (response: CredentialResponse) => {
      try {
        alert("hello google login")
      } catch (error) {
        console.error('Error logging in with Google:', error);
      }
    }, []);

    return <Page type="Login" onClick={onLogin} emailValid={emailValid} setEmailValid={setEmailValid} passwordValid={passwordValid} setPasswordValid={setPasswordValid} />;
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
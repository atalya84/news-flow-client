import './AuthStyle.css';

import Card from '@mui/material/Card';
import { FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { FormProps } from '../../types/Props';
import { AuthForm } from './AuthForm';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '@react-oauth/google';
import { FieldValidation } from '../../types/Auth';
// import { AuthContext } from '../../context/Context';
// import { registerGoogle, register } from '../../services/auth/AuthServices';


export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [passwordValid, setPasswordValid] = useState<FieldValidation>({ isValid: true, errorText: '' });

    const onSignUp = useCallback(async (formData: FormData) => {
        try {
            alert("hello sign up")
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx ~ onSignUp ~ e', e);
        }
    }, []);

    return <Page type="Sign Up" onClick={onSignUp} emailValid={emailValid} setEmailValid={setEmailValid} passwordValid={passwordValid} setPasswordValid={setPasswordValid} />;
};

export const LoginPage: FC = () => {
    const [emailValid, setEmailValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [passwordValid, setPasswordValid] = useState<FieldValidation>({ isValid: true, errorText: '' });

    const onLogin = useCallback(async (formData: FormData) => {
        try {
            alert("hello login")
        } catch (e) {
            console.log('🚀 ~ file: loginPage.tsx:38 ~ onLogin ~ e', e);
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
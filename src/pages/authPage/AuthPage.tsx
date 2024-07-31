import './AuthStyle.css';

import Card from '@mui/material/Card';
import { FC } from 'react';
import { FormProps } from '../../types/Props';
import { AuthForm } from './AuthForm';
import { registrUser, loginUser } from '../../services/auth.service';


export const SignUpPage: FC = () => {
    return <Page type="Sign Up" onClick={registrUser} />;
};

export const LoginPage: FC = () => {
    return <Page type="Login" onClick={loginUser} />;
};

const Page: FC<FormProps> = (formProps) => {
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
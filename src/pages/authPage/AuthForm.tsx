import './AuthStyle.css';
import { FC, useState, useCallback, useEffect, useMemo, ChangeEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import TextInput from '../../ui/Auth/TextField';
import { Divider, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { AppLogo } from '../../ui';
import { FormProps } from '../../types/Props';
import { FieldValidation } from '../../types/Auth';
import DropFileInput from '../../ui/Auth/ImageInput';
import { uploadPhoto } from '../../services/file-service';
import { IUser } from '../../types/User';
import axios from 'axios';
import { getFileExt } from '../../utils';
import { AuthContext } from '../../Context';

const MIN_PASSWORD_DIGITS = 8;

export const AuthForm: FC<FormProps> = ({ type, onClick, onGoogleLogin}) => {
    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [imageInfo, setImageInfo] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isLogin = useMemo(() => type === 'Login', [type]);

    const [nameValid, setNameValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [passConfValid, setPassConfValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [emailValid, setEmailValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [passwordValid, setPasswordValid] = useState<FieldValidation>({ isValid: true, errorText: '' });
    const [imageValid, setImageValid] = useState<boolean>(true);

    const isEmailValid = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleProfilePic = async (): Promise<string> => {
        try {
            const formData: FormData = new FormData()
            formData.append('file', imageInfo!, 'profile.' + getFileExt(imageInfo?.name),);
            const url = await uploadPhoto(formData);
            if (!url) {
                console.log('image was not uploaded')
            }
            return url
        } catch (error) {
            console.error('Error uploading image:', error);
            return '';
        }
    }

    const handleForm = useCallback(async () => {
        setIsLoading(true);
        var imageUrl
        if (type === 'Sign Up'){
            imageUrl = await handleProfilePic()
        }
        const user: IUser = {
            email: email,
            name: name,
            imgUrl: imageUrl,
            password: password
        }
        try {
            const activeUser = await onClick(user)
            setUser(activeUser)
            navigate('/')
        } catch (error) {
            if(axios.isAxiosError(error)){
                if (error.response?.data === "User already exists") {
                    setEmailValid({isValid: false, errorText: "email already exists"})
                } else if (error.response?.data === "Invalid credentials") {
                    setEmailValid({isValid: false, errorText: "email or password incorrect"})
                    setPasswordValid({isValid: false, errorText: "email or password incorrect"})
                }
            } else {
                console.log("error in AuthForm:", error)
            }
        }
        setIsLoading(false);
      }, [email, password, name, imageInfo]);

    const validateForm = () => {
        var formIsValid = 0

        if (email.length === 0) {
            setEmailValid({ isValid: false, errorText: 'Email can\'t be empty'});
        } else if (!isEmailValid(email)) {
            setEmailValid({ isValid: false, errorText: 'Email format is wrong'});
        } else {
            setEmailValid({ isValid: true, errorText: ''});
            formIsValid += 1
        }

        if (password.length === 0) {
            setPasswordValid({ isValid: false, errorText: 'Password can\'t be empty'});
        } else if (password.length < MIN_PASSWORD_DIGITS) {
            setPasswordValid({ isValid: false, errorText: 'Password has to be at least 8 chracters'});
        } else {
            setPasswordValid({ isValid: true, errorText: ''});
            formIsValid += 1
        }

        if (type === 'Sign Up') {
            
            if (!imageInfo) {
                setImageValid(false)
            } else {
                setImageValid(true)
                formIsValid += 1
            }

            if (name.length === 0) {
                setNameValid({ isValid: false, errorText: 'User Name can\'t be empty'});
            } else {
                setNameValid({ isValid: true, errorText: ''});
                formIsValid += 1
            }

            if (confirmPassword !== password) {
                setPassConfValid({ isValid: false, errorText: 'Passwords don\'t match'});
            } else {
                setPassConfValid({ isValid: true, errorText: ''});
                formIsValid += 1
            }
            
            if (formIsValid === 5) {
                handleForm()
            }
        } else if (formIsValid === 2) {
            handleForm()
        }
    }


    const onGoogleLoginSuccess = useCallback(async (response: CredentialResponse) => {
        if (onGoogleLogin) {
            setIsLoading(true);
            try {
                await onGoogleLogin(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [onGoogleLogin]);

    const onGoogleLoginFailure = () => {
        console.log("Google login failed");
    };

    return (
        <div className="login-form">
            <div className="logo-container">
                <AppLogo hideTitle={true} />
            </div>
            {isLogin ? (
                <span>
                    <h1>Welcome Back!</h1>
                    <h1>To Continue, Please Log In</h1>
                </span>
            ) : (
                <span>
                    <h1>Hello There!</h1>
                    <h1>To Continue, Please Enter Your Info</h1>
                </span>
            )}
            {!isLogin && (
                <>
                    <DropFileInput onChange={setImageInfo} error={!imageValid} />
                    <TextInput icon={<AccountCircleIcon />} title="Enter your name" value={name} onChange={setName} isValueValid={nameValid.isValid} errorText={nameValid.errorText} />
                </>
            )}
            <TextInput icon={<AlternateEmailIcon />} title="Email" type="email" value={email} onChange={setEmail} isValueValid={emailValid.isValid} errorText={emailValid.errorText}/>

            <TextInput icon={<LockIcon />} title="Password" value={password} type='password' onChange={setPassword} isValueValid={passwordValid.isValid} errorText={passwordValid.errorText}/>
            {!isLogin && (
                <TextInput icon={<LockIcon />} title="Confirm Password" type='password' value={confirmPassword} onChange={setConfirmPassword} isValueValid={passConfValid.isValid} errorText={passConfValid.errorText}/>
            )}

            <LoadingButton
                className='login'
                onClick={validateForm}
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
                endIcon={<SendIcon />}
            >
                {type}
            </LoadingButton>

            <Divider sx={{marginY:3, color:'whitesmoke', borderColor: 'whitesmoke'}}>----------------------------------- Or Continue With -----------------------------------</Divider>

            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />

            <div className='switch'>
                <Typography sx={{color:'whitesmoke'}} variant="body1">
                    {isLogin ? (
                        <span>
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: '#f9b334' }}>
                                Register Now
                            </Link>
                        </span>
                    ) : (
                        <span>
                            Already Have An Account?{' '}
                            <Link to="/login" style={{ color: '#f9b334' }}>
                                Login Now
                            </Link>
                        </span>
                    )}
                </Typography>
            </div>
        </div>
    );
};
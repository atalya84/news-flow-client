import { HTMLInputTypeAttribute } from "react";
import { FieldValidation } from "./Auth";

export interface TextFieldProps {
    value?: string;
    type?: HTMLInputTypeAttribute;
    title?: string;
    icon?: any;
    className?: string;
    onChange?: (value: string) => void;
    errorText?: string;
    isValueValid?: boolean;
}

export interface FormProps {
    type: 'Login' | 'Sign Up';
    onClick: (formData: FormData) => Promise<void>;
    onGoogleLogin?: (response: any) => Promise<void>; 
    emailValid: FieldValidation;
    setEmailValid: React.Dispatch<React.SetStateAction<FieldValidation>>;
    passwordValid: FieldValidation;
    setPasswordValid: React.Dispatch<React.SetStateAction<FieldValidation>>;
}
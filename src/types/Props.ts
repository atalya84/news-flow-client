import { HTMLInputTypeAttribute } from "react";
import { IUser } from "./user.types";

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
    onClick: (user: IUser) => Promise<IUser>;
    onGoogleLogin?: (response: any) => Promise<void>;
}

export interface ImageInputProps {
    onChange: (imageUrl: any | null) => void;
    className?: string;
    error?: boolean;
    src?: string;
}
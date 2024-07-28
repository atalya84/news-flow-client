import { HTMLInputTypeAttribute } from "react";
import { FieldValidation } from "./Auth";
import { IUser } from "./User";

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
    onClick: (user: IUser) => Promise<any>;
    onGoogleLogin?: (response: any) => Promise<void>;
}

export interface ImageInputProps {
    onChange: (imageUrl: any | null) => void;
    error: boolean;
}
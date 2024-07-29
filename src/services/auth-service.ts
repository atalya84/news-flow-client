import axios from "axios";
import { useCallback } from "react";
import { IUser } from "../types/User";
import apiClient from "./api-client";

export const registrUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        apiClient.post("/auth/register", user)
        .then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const loginUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Loging user...")
        const email = user.email
        const password = user.password
        apiClient.post("/auth/login", { email, password })
        .then((response) => {
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            resolve(response.data.user)

        }).catch((error) => {
            reject(error)
        })
    })
}

export async function getActiveUser(): Promise<IUser | null> {    
    if (!localStorage.getItem('accessToken') )
        return null;
    const res = await apiClient.get('/users/self');
    return res.data.user;
} 
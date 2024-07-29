import { IUser } from "../types/user.types";
import apiClient from "./api-client";

export async function getActiveUser(): Promise<IUser | null> {    
    if (!localStorage.getItem('accessToken') )
        return null;
    const res = await apiClient.get('/users/self');
    return res.data.user;
} 
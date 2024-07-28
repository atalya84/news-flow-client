import axios from "axios";
import { useCallback } from "react";
import { IUser } from "../types/User";
import apiClient from "./api-client";

export const registrUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        apiClient.post("/auth/register", user)
        .then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}
import { createContext } from "react";
import { IUser } from "./types/User";

export const AuthContext = createContext<{user: IUser | null, setUser: Function}>({
    user: null,
    setUser: () => {}
});
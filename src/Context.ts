import { createContext } from "react";
import { IUser } from "./types/user.types";

export const AuthContext = createContext<{user: IUser | null | undefined, setUser: Function}>({
    user: null,
    setUser: () => {}
});
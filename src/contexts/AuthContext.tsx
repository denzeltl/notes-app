import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface AuthProps {
    children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProps) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: any = {
        currentUser,
        signup,
        login,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

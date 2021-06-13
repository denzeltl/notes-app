import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";

interface AuthProps {
    children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProps) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [currentUserName, setCurrentUserName] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            firestore
                .collection("users")
                .doc(user?.uid)
                .get()
                .then((doc) => {
                    setCurrentUserName(doc.data()?.name);
                });
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: any = {
        currentUser,
        currentUserName,
        signup,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

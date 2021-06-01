import React, { createContext, useContext } from "react";
import { firestore } from "../firebase";

interface FirestoreProps {
    children: JSX.Element | JSX.Element[];
}

const FirestoreContext = createContext(null);

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }: FirestoreProps) {
    const value: any = {};

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
}

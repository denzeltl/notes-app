import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

interface FirestoreProps {
    children: JSX.Element | JSX.Element[];
}

interface INotes {
    id: string;
    title: string;
    body: string;
}

const FirestoreContext = createContext(null);

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }: FirestoreProps) {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState<firebase.default.firestore.DocumentData[] | null>(null);

    function addAccountName(cred: string, name: string) {
        return firestore.collection("users").doc(cred).set({
            name,
        });
    }

    function addAccountNote(cred: string, note: { body: string; title: string }) {
        return firestore.collection("notes").doc(cred).set({
            note,
        });
    }

    useEffect(() => {
        const fetchNotes = firestore.collection("notes").onSnapshot((serverUpdate) => {
            const notes = serverUpdate.docs.map((_doc) => {
                const data = _doc.data();
                data["id"] = _doc.id;
                return data;
            });
            setNotes(notes);
        });

        return fetchNotes;
    }, []);

    const value: any = {
        selectedNoteIndex,
        selectedNote,
        notes,
        addAccountName,
    };

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
}

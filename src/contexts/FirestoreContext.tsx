import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebase";
import firebase from "firebase/app";

interface FirestoreProps {
    children: JSX.Element | JSX.Element[];
}

interface INote {
    id: string;
    title: string;
    body: string;
}

const FirestoreContext = createContext(null);

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }: FirestoreProps) {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);
    const [notes, setNotes] = useState<firebase.firestore.DocumentData[] | null>(null);

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

    function selectNote(note: INote, index: any) {
        setSelectedNote(note);
        setSelectedNoteIndex(index);
    }

    function updateNote(id: string, note: INote) {
        return firestore
            .collection("notes")
            .doc(auth.currentUser?.uid)
            .collection("notesList")
            .doc(id)
            .update({ title: note.title, body: note.body, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    }

    function deleteNote() {}

    useEffect(() => {
        const fetchNotes = firestore
            .collection("notes")
            .doc(auth.currentUser?.uid)
            .collection("notesList")
            .onSnapshot((serverUpdate) => {
                const notes = serverUpdate.docs.map((_doc) => {
                    const data = _doc.data();
                    data["id"] = _doc.id;
                    return data;
                });
                setNotes(notes);
            });

        return fetchNotes;
    }, []);

    // useEffect(() => {
    //     if (notes) {
    //         const lastNote: any = notes[notes.length - 1];
    //         const lastNoteIndex = notes.length - 1;
    //         setSelectedNote(lastNote);
    //         setSelectedNoteIndex(lastNoteIndex);
    //     }
    // }, [notes]);

    const value: any = {
        selectedNoteIndex,
        selectedNote,
        notes,
        addAccountName,
        selectNote,
        updateNote,
    };

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
}

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
    timestamp?: any;
}

const FirestoreContext = createContext(null);

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }: FirestoreProps) {
    const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);
    const [notes, setNotes] = useState<any>(null);

    function addAccountName(cred: string, name: string) {
        return firestore.collection("users").doc(cred).set({
            name,
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

    async function addAccountNote() {
        const newNote = {
            title: `Note ${notes?.length! + 1}`,
            body: "",
        };
        const addNoteToDb = await firestore.collection("notes").doc(auth.currentUser?.uid).collection("notesList").add({
            title: newNote.title,
            body: newNote.body,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        const newId = addNoteToDb.id;
        await setNotes([...notes, newNote]);
        // TODO: Select newly created note
        const newNoteIndex = notes.indexOf(notes.filter((_note: any) => _note.id === newId)[0]);
        setSelectedNote(notes[newNoteIndex]);
        setSelectedNoteIndex(newNoteIndex);
    }

    function deleteNote() {}

    console.log(notes);

    function fetchNotes() {
        setSelectedNoteIndex(null);
        setSelectedNote(null);
        setNotes(null);
        firestore
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
    }

    // TODO: function to auto select on load the latest note
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
        fetchNotes,
        addAccountName,
        selectNote,
        updateNote,
        addAccountNote,
    };

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
}

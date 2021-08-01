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
        return firestore.collection("user").doc(cred).set({
            name,
        });
    }

    function selectNote(note: INote, index: any) {
        setSelectedNote(note);
        setSelectedNoteIndex(index);
    }

    function updateNote(id: string, note: INote) {
        return firestore
            .collection("user")
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
        const addNoteToDb = await firestore.collection("user").doc(auth.currentUser?.uid).collection("notesList").add({
            title: newNote.title,
            body: newNote.body,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        const newId = addNoteToDb.id;
        await setNotes([...notes, newNote]);
        const newNoteIndex = notes.indexOf(notes.filter((_note: any) => _note.id === newId)[0]);
        setSelectedNote(notes[newNoteIndex]);
        setSelectedNoteIndex(newNoteIndex);
        selectFirstNote();
    }

    function deleteNote(note: INote) {
        firestore.collection("user").doc(auth.currentUser?.uid).collection("notesList").doc(note.id).delete();
        selectFirstNote();
    }

    function fetchNotes() {
        setSelectedNoteIndex(null);
        setSelectedNote(null);
        setNotes(null);
        firestore
            .collection("user")
            .doc(auth.currentUser?.uid)
            .collection("notesList")
            .onSnapshot((serverUpdate) => {
                const notes = serverUpdate.docs
                    .map((_doc) => {
                        const data = _doc.data();
                        data["id"] = _doc.id;
                        return data;
                    })
                    .sort((a, b) => {
                        if (a.timestamp !== null && b.timestamp !== null) {
                            const note1 = a.timestamp.seconds;
                            const note2 = b.timestamp.seconds;

                            return note2 - note1;
                        } else {
                            return 1;
                        }
                    });
                setNotes(notes);
            });
    }

    // TODO: function to auto select on load the latest note (ADD THIS ON ADD AND DELETE NOTE)
    function selectFirstNote() {
        const firstNote: any = notes[0];
        const firstNoteIndex = 0;
        setSelectedNote(firstNote);
        setSelectedNoteIndex(firstNoteIndex);
    }

    const value: any = {
        selectedNoteIndex,
        selectedNote,
        notes,
        fetchNotes,
        selectFirstNote,
        addAccountName,
        selectNote,
        updateNote,
        addAccountNote,
        deleteNote,
    };

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
}

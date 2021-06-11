import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ReactQuill from "react-quill";
import { useDebouncedCallback } from "use-debounce";
import { useFirestore } from "../contexts/FirestoreContext";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 2rem 2rem 1rem",
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface MainEditorProps {}

const MainEditor: React.FC<MainEditorProps> = () => {
    const classes = useStyles();
    const [noteText, setNoteText] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteId, setNoteId] = useState("");
    const { selectedNote }: any = useFirestore();

    const updateNote = async (val: any) => {
        await setNoteText(val);
        debounced();
    };

    const debounced = useDebouncedCallback(() => {
        console.log("object");
    }, 1500);

    useEffect(() => {
        if (selectedNote) {
            setNoteText(selectedNote.body);
            setNoteTitle(selectedNote.title);
            setNoteId(selectedNote.id);
        }
    }, [selectedNote]);

    return <div className={classes.root}>{selectedNote ? <ReactQuill value={noteText} onChange={updateNote} /> : <Typography>Please create a note</Typography>}</div>;
};

export default MainEditor;

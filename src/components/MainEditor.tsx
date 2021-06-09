import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ReactQuill from "react-quill";
import { useDebouncedCallback } from "use-debounce";

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

    const updateNote = async (val: any) => {
        await setNoteText(val);
        debounced();
    };

    const debounced = useDebouncedCallback(() => {
        console.log("object");
    }, 1500);

    return (
        <div className={classes.root}>
            <ReactQuill value={noteText} onChange={updateNote} />
        </div>
    );
};

export default MainEditor;

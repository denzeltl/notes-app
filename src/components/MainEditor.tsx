import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Grid, IconButton } from "@material-ui/core";
import ReactQuill from "react-quill";
import { useDebouncedCallback } from "use-debounce";
import { useFirestore } from "../contexts/FirestoreContext";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 2rem 2rem 1rem",
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
    deleteIcon: {
        marginRight: "0.2rem",
    },
}));

interface MainEditorProps {}

const MainEditor: React.FC<MainEditorProps> = () => {
    const classes = useStyles();
    const [noteText, setNoteText] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteId, setNoteId] = useState("");
    const { selectedNote, updateNote, deleteNote }: any = useFirestore();

    const updateBody = async (val: any) => {
        await setNoteText(val);
        debounced();
    };

    const debounced = useDebouncedCallback(() => {
        updateNote(noteId, { body: noteText, title: noteTitle });
    }, 1000);

    useEffect(() => {
        if (selectedNote) {
            setNoteText(selectedNote.body);
            setNoteTitle(selectedNote.title);
            setNoteId(selectedNote.id);
        }
    }, [selectedNote]);

    return (
        <div className={classes.root}>
            {selectedNote ? (
                <>
                    <Grid container item alignItems="center" justify="space-between">
                        <Typography variant="h5">{noteTitle}</Typography>
                        <IconButton
                            aria-label="delete note"
                            edge="start"
                            size="small"
                            onClick={() => {
                                deleteNote(selectedNote);
                            }}
                        >
                            <DeleteIcon className={classes.deleteIcon} />
                            <Typography variant="body1">Delete note</Typography>
                        </IconButton>
                    </Grid>
                    <ReactQuill value={noteText} onChange={updateBody} />
                </>
            ) : (
                <Typography>Please create a note</Typography>
            )}
        </div>
    );
};

export default MainEditor;

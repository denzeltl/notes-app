import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Grid, IconButton, Dialog, DialogTitle, InputBase, DialogActions, Button } from "@material-ui/core";
import ReactQuill from "react-quill";
import { useDebouncedCallback } from "use-debounce";
import { useFirestore } from "../contexts/FirestoreContext";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "calc(100vh - 80px)",
        padding: "2rem 2rem 2rem 1rem",
        [theme.breakpoints.down("xl")]: {},
    },
    noteSection: {},
    noteHeading: {
        marginBottom: "1rem",
    },
    deleteIcon: {
        marginRight: "0.2rem",
    },
    noteTitle: {
        fontWeight: "bold",
        fontSize: "1.4rem",
        background: "#fff",
        flex: 1,
        marginRight: "2rem",
        border: "1px solid #ccc",
        padding: "0.2rem 0.8rem",
        borderRadius: "4px",
    },
    dialog: {
        "& .MuiPaper-root": {
            padding: "1rem",
        },
    },
    dialogYesButton: {
        fontWeight: "bold",
    },
    reactQuill: {
        borderRadius: "4px",
        background: "#fff",
    },
}));

interface MainEditorProps {}

const MainEditor: React.FC<MainEditorProps> = () => {
    const classes = useStyles();
    const [noteText, setNoteText] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteId, setNoteId] = useState("");
    const { selectedNote, updateNote, deleteNote }: any = useFirestore();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogConfirm = () => {
        setOpenDialog(false);
        deleteNote(selectedNote);
    };

    const updateBody = async (val: any) => {
        await setNoteText(val);
        debounced();
    };

    const updateTitle = async (title: string) => {
        await setNoteTitle(title);
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
                <Grid container direction="column" className={classes.noteSection}>
                    <Grid container item alignItems="center" justify="space-between" className={classes.noteHeading}>
                        <InputBase className={classes.noteTitle} placeholder="Title" value={noteTitle} onChange={(e) => updateTitle(e.target.value)} />
                        <IconButton aria-label="delete note" edge="start" size="small" onClick={handleDialogOpen}>
                            <DeleteIcon className={classes.deleteIcon} />
                            <Typography variant="body1">Delete note</Typography>
                        </IconButton>
                    </Grid>
                    <ReactQuill value={noteText} onChange={updateBody} className={classes.reactQuill} />
                </Grid>
            ) : (
                <Typography>Please create a note</Typography>
            )}
            <Dialog open={openDialog} aria-labelledby="delete-dialog-title" className={classes.dialog}>
                <DialogTitle id="delete-dialog-title">{`Are you sure you want to delete ${noteTitle}?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDialogConfirm} color="primary" autoFocus className={classes.dialogYesButton}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MainEditor;

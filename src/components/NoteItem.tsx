import React from "react";
import { makeStyles, Grid, Paper, Typography, ButtonBase } from "@material-ui/core";
import { useFirestore } from "../contexts/FirestoreContext";
import clsx from "clsx";
import { removeHTMLTags } from "../helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
    paper: {
        padding: "1rem",
        textAlign: "left",
        width: "100%",
    },
    selected: {
        background: "#F3F0DA",
    },
    noteItem: {
        width: "33%",
    },
    buttonBase: {
        width: "100%",
    },
    noteTitle: {
        marginBottom: "0.4rem",
        fontWeight: 600,
        lineHeight: 1.4,
    },
    noteBody: {
        marginBottom: "0.5rem",
    },
    noteDate: {
        color: "#a4a4a4",
    },
}));

interface NoteItemProps {
    note: { body: string; id: string; title: string; timestamp?: any };
    index: number;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, index }) => {
    const classes = useStyles();
    const { selectedNoteIndex, selectNote }: any = useFirestore();

    return (
        <Grid item className={classes.noteItem}>
            <ButtonBase onClick={() => selectNote(note, index)} className={classes.buttonBase}>
                <Paper elevation={2} className={clsx(classes.paper, selectedNoteIndex === index ? classes.selected : "")}>
                    <Typography variant="h6" component="h4" className={classes.noteTitle}>
                        {note.title}
                    </Typography>
                    <Typography variant="body1" className={classes.noteBody}>
                        {note.body.length < 30 ? removeHTMLTags(note.body) : removeHTMLTags(note.body.substring(0, 30)) + "..."}
                    </Typography>
                    <Typography variant="body2" className={classes.noteDate}>
                        {/* TODO: display the note timestamp */}
                        Note Timestamp
                    </Typography>
                </Paper>
            </ButtonBase>
        </Grid>
    );
};

export default NoteItem;

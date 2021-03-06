import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Paper, Typography, ButtonBase } from "@material-ui/core";
import { useFirestore } from "../contexts/FirestoreContext";
import clsx from "clsx";
import { removeHTMLTags } from "../helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
    paper: {
        padding: "0.5rem",
        textAlign: "left",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    selected: {
        background: "#F3F0DA",
    },
    noteItem: {
        width: "100%",
        height: "100%",
        maxHeight: "150px",
    },
    buttonBase: {
        width: "100%",
        height: "100%",
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
    const [convertedDate, setConvertedDate]: any = useState(null);
    const [convertedTime, setConvertedTime]: any = useState(null);

    useEffect(() => {
        if (note.timestamp) {
            setConvertedDate(note.timestamp.toDate().toDateString());
            setConvertedTime(note.timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
    }, [note.timestamp]);

    return (
        <Grid item className={classes.noteItem}>
            <ButtonBase onClick={() => selectNote(note, index)} className={classes.buttonBase}>
                <Paper elevation={2} className={clsx(classes.paper, selectedNoteIndex === index ? classes.selected : "")}>
                    <div>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            {note.title}
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            {note.body.length < 30 ? removeHTMLTags(note.body) : removeHTMLTags(note.body.substring(0, 30)) + "..."}
                        </Typography>
                    </div>
                    <Typography variant="body2" className={classes.noteDate}>
                        {convertedTime}
                        <br />
                        {convertedDate}
                    </Typography>
                </Paper>
            </ButtonBase>
        </Grid>
    );
};

export default NoteItem;

import React from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";
import { useFirestore } from "../contexts/FirestoreContext";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
    paper: {
        padding: "1rem",
    },
    noteItem: {
        width: "33%",
    },
    noteTitle: {
        marginBottom: "0.4rem",
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
    note: { body: string; id: string; title: string };
    index: number;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }, index) => {
    const classes = useStyles();
    const { selectedNoteIndex }: any = useFirestore();

    return (
        <Grid item className={classes.noteItem} key={index}>
            <Paper elevation={2} className={classes.paper}>
                <Typography variant="h6" component="h4" className={classes.noteTitle}>
                    {note.title}
                </Typography>
                <Typography variant="body1" className={classes.noteBody}>
                    {note.body.length < 30 ? note.body : note.body.substring(0, 30) + "..."}
                </Typography>
                <Typography variant="body2" className={classes.noteDate}>
                    Jun 6, 2021
                </Typography>
            </Paper>
        </Grid>
    );
};

export default NoteItem;

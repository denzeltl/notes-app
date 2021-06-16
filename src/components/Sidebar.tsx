import React from "react";
import { makeStyles, Grid, Typography, IconButton } from "@material-ui/core";
import { AddCircleOutline as AddCircleOutlineIcon } from "@material-ui/icons";
import { useFirestore } from "../contexts/FirestoreContext";
import NoteItem from "./NoteItem";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 1rem 2rem 2rem",
        height: "calc(100vh - 80px)",
        [theme.breakpoints.down("xl")]: {},
    },
    sidebarHeader: {
        marginBottom: "2rem",
    },
    addIcon: {
        marginRight: "0.5rem",
    },
    noteList: {
        overflow: "auto",
        flex: 1,
    },
}));

interface SidebarProps {}

interface INoteItem {
    body: string;
    id: string;
    title: string;
    timestamp?: any;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const classes = useStyles();
    const { notes, addAccountNote }: any = useFirestore();

    return (
        <Grid container direction="column" className={classes.root}>
            <Grid container item alignItems="center" justify="space-between" className={classes.sidebarHeader}>
                <Typography variant="h4" component="h1">
                    Notes
                </Typography>
                <IconButton aria-label="new note" edge="start" size="small" onClick={addAccountNote}>
                    <AddCircleOutlineIcon className={classes.addIcon} />
                    <Typography variant="body1">Add new note</Typography>
                </IconButton>
            </Grid>
            <Grid container item spacing={2} className={classes.noteList}>
                {notes ? notes.map((_note: INoteItem, _index: number) => <NoteItem note={_note} index={_index} key={_index} />) : <Typography>Loading...</Typography>}
            </Grid>
        </Grid>
    );
};

export default Sidebar;

import React from "react";
import { makeStyles, Grid, Typography, IconButton, Paper } from "@material-ui/core";
import { AddCircleOutline as AddCircleOutlineIcon } from "@material-ui/icons";
import { useFirestore } from "../contexts/FirestoreContext";

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
    paper: {
        padding: "1rem",
    },
    noteList: {
        overflow: "auto",
        flex: 1,
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

interface SidebarProps {}

interface INoteItem {
    body: string;
    id: string;
    title: string;
    selectedNoteIndex: any;
    selectNote: () => {};
    deleteNote: () => {};
}

const Sidebar: React.FC<SidebarProps> = () => {
    const classes = useStyles();
    const { notes, selectedNoteIndex }: any = useFirestore();

    const selectNote = () => {
        console.log("select note");
    };
    const deleteNote = () => {
        console.log("select note");
    };

    return (
        <Grid container direction="column" className={classes.root}>
            <Grid container item alignItems="center" justify="space-between" className={classes.sidebarHeader}>
                <Typography variant="h4" component="h1">
                    Notes
                </Typography>
                <IconButton aria-label="new note" edge="start" size="small">
                    <AddCircleOutlineIcon className={classes.addIcon} />
                    <Typography variant="body1">Add new note</Typography>
                </IconButton>
            </Grid>
            <Grid container item spacing={2} className={classes.noteList}>
                {notes ? (
                    notes.map((_note: INoteItem, _index: number) => {
                        console.log(_note);
                        return (
                            <Grid item className={classes.noteItem} key={_index}>
                                <Paper elevation={2} className={classes.paper}>
                                    <Typography variant="h6" component="h4" className={classes.noteTitle}>
                                        {_note.title}
                                    </Typography>
                                    <Typography variant="body1" className={classes.noteBody}>
                                        {_note.body}
                                    </Typography>
                                    <Typography variant="body2" className={classes.noteDate}>
                                        Jun 6, 2021
                                    </Typography>
                                </Paper>
                            </Grid>
                        );
                    })
                ) : (
                    <Typography>Loading...</Typography>
                )}
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 7
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 6
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 5
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 4
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 3
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 2
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 1
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
                        </Typography>
                        <Typography variant="body2" className={classes.noteDate}>
                            Jun 6, 2021
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Sidebar;

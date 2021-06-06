import React from "react";
import { makeStyles, Grid, Typography, IconButton, Paper } from "@material-ui/core";
import { AddCircleOutline as AddCircleOutlineIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 1rem 2rem 2rem",
        height: "100%",
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
    noteItem: {
        width: "33%",
    },
    noteTitle: {
        marginBottom: "0.8rem",
    },
    noteBody: {},
}));

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container alignItems="center" justify="space-between" className={classes.sidebarHeader}>
                <Typography variant="h4" component="h1">
                    Notes
                </Typography>
                <IconButton aria-label="new note" edge="start" size="small">
                    <AddCircleOutlineIcon className={classes.addIcon} />
                    <Typography variant="body1">Add new note</Typography>
                </IconButton>
            </Grid>
            <Grid container spacing={2}>
                <Grid item className={classes.noteItem}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h6" component="h4" className={classes.noteTitle}>
                            Note 1
                        </Typography>
                        <Typography variant="body1" className={classes.noteBody}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quo.
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
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Sidebar;

import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainEditor from "./MainEditor";
import { useFirestore } from "../contexts/FirestoreContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        background: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
    },
    bodyContainer: {
        flex: 1,
    },
    sidebar: {
        borderRight: "1px solid #ccc",
    },
}));

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const classes = useStyles();
    const { fetchNotes }: any = useFirestore();

    useEffect(() => {
        fetchNotes();

        return fetchNotes();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container className={classes.bodyContainer}>
                <Grid item xs={5} className={classes.sidebar}>
                    <Sidebar />
                </Grid>
                <Grid item xs={7}>
                    <MainEditor />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;

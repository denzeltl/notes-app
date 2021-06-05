import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainEditor from "./MainEditor";

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
}));

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container className={classes.bodyContainer}>
                <Grid item xs={5}>
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

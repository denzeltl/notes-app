import React from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        background: "#f1f1f1",
    },
}));

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
        </div>
    );
};

export default Dashboard;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import "./App.css";
import Signup from "./components/Signup";

const useStyles = makeStyles((theme) => ({
    root: {},
    main: {},
    headerTitle: {
        textAlign: "center",
        padding: "3rem 0",
    },
}));

interface AppProps {}

const App: React.FC<AppProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Typography variant="h3" component="h1" className={classes.headerTitle}>
                    Notes App
                </Typography>
                <Signup />
            </main>
        </div>
    );
};

export default App;

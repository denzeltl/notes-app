import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    main: {},
    wrapper: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
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
            <main className={classes.main}></main>
            <div className={classes.wrapper}>
                <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        </div>
    );
};

export default App;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteUser from "./components/PrivateRouteUser";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRouteUser path="/signup" component={Signup} />
                <PrivateRouteUser path="/login" component={Login} />
            </Switch>
        </div>
    );
};

export default App;

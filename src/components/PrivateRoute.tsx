import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface PrivateRouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}></div>;
};

export default PrivateRoute;

import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}></div>;
};

export default Navbar;

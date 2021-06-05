import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#ddd",
        padding: "1rem 1rem 1rem 2rem",
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}>Sidebar</div>;
};

export default Sidebar;

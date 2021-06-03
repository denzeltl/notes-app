import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}></div>;
};

export default Sidebar;

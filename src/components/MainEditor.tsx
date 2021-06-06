import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#cacaca",
        padding: "2rem 2rem 2rem 1rem",
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface MainEditorProps {}

const MainEditor: React.FC<MainEditorProps> = () => {
    const classes = useStyles();

    return <div className={classes.root}>Editor</div>;
};

export default MainEditor;

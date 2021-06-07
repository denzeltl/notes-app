import React from "react";
import { makeStyles } from "@material-ui/core";
import ReactQuill from "react-quill";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 2rem 2rem 1rem",
        height: "100%",
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface MainEditorProps {}

const MainEditor: React.FC<MainEditorProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ReactQuill value={"asd"} onChange={() => console.log("object")} />
        </div>
    );
};

export default MainEditor;
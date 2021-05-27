import React, { useRef } from "react";
import { makeStyles, Grid, TextField, Button, Typography, Paper, Link } from "@material-ui/core";
import { Email as EmailIcon, Lock as LockIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        [theme.breakpoints.down("xl")]: {},
    },
    paper: {
        padding: "2rem 4rem",
        marginBottom: "1rem",
    },
    title: {
        marginBottom: "1rem",
    },
    formInput: {
        marginBottom: "1rem",
    },
    form: {},
}));

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.title}>
                    Sign Up
                </Typography>
                <form className={classes.form} autoComplete="off">
                    <TextField
                        id="email-input"
                        className={classes.formInput}
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        helperText="Feel free to input a dummy email"
                        required
                        inputRef={emailRef}
                    />
                    <TextField
                        id="password-input"
                        className={classes.formInput}
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        autoComplete="current-password"
                        required
                        inputRef={passwordRef}
                    />
                    <TextField
                        id="confirm-password-input"
                        className={classes.formInput}
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        autoComplete="current-password"
                        required
                        inputRef={confirmPasswordRef}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth size="large">
                        Submit
                    </Button>
                </form>
            </Paper>
            <Typography variant="body1">
                <Link href="#" color="inherit">
                    Already have an account? Log In
                </Link>
            </Typography>
        </div>
    );
};

export default Signup;

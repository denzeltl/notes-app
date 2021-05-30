import React, { useRef, useState } from "react";
import { makeStyles, TextField, Button, Typography, Paper, Link, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext";
import { Link as RouterLink, useHistory } from "react-router-dom";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        [theme.breakpoints.down("xl")]: {},
    },
    paper: {
        padding: "2rem",
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

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const classes = useStyles();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const { login }: any = useAuth();
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            await login(emailRef.current && emailRef.current.value, passwordRef.current && passwordRef.current.value);
            setError("");
            history.push("/");
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setOpenSnackbar(true);
                setError("Please enter a valid email");
            } else if (error.code === "auth/user-not-found") {
                setOpenSnackbar(true);
                setError("Email not found");
            } else if (error.code === "auth/wrong-password") {
                setOpenSnackbar(true);
                setError("Incorrect password");
            } else {
                setOpenSnackbar(true);
                setError("Failed to log in");
            }
        }

        setLoading(false);
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.title}>
                    Log In
                </Typography>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    <TextField id="email-input" className={classes.formInput} label="Email Address" type="email" variant="outlined" fullWidth required inputRef={emailRef} />
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
                    <Button variant="contained" color="primary" type="submit" fullWidth size="large" disabled={loading}>
                        Log In
                    </Button>
                </form>
            </Paper>
            <Typography variant="body1">
                <Link component={RouterLink} to="/signup">
                    Don't have an account? Sign Up
                </Link>
            </Typography>
            <Snackbar autoHideDuration={3000} onClose={handleSnackbarClose} open={openSnackbar}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    <Typography>{error}</Typography>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;

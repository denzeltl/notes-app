import React, { useRef, useState } from "react";
import { makeStyles, TextField, Button, Typography, Paper, Link, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext";
import { useFirestore } from "../contexts/FirestoreContext";
import { Link as RouterLink } from "react-router-dom";

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

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
    const classes = useStyles();
    const nameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const confirmPasswordRef = useRef<HTMLInputElement>();
    const { signup }: any = useAuth();
    const { addAccountName }: any = useFirestore();
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (passwordRef.current && confirmPasswordRef.current && passwordRef.current.value !== confirmPasswordRef.current.value) {
            setOpenSnackbar(true);
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);
            await signup(emailRef.current && emailRef.current.value, passwordRef.current && passwordRef.current.value).then((cred: any) => {
                addAccountName(cred.user.uid, nameRef.current && nameRef.current.value);
            });
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setOpenSnackbar(true);
                setError("Please enter a valid email");
            } else if (error.code === "auth/weak-password") {
                setOpenSnackbar(true);
                setError("Password is too weak");
            } else if (error.code === "auth/email-already-in-use") {
                setOpenSnackbar(true);
                setError("Email is already existing");
            } else {
                setOpenSnackbar(true);
                setError("Failed to create an account");
            }
        }

        setLoading(false);
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.title}>
                    Sign Up
                </Typography>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    <TextField id="name-input" className={classes.formInput} label="Name" type="text" variant="outlined" fullWidth required inputRef={nameRef} />
                    <TextField
                        id="email-input"
                        className={classes.formInput}
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        helperText="Feel free to input a fake email"
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
                    <Button variant="contained" color="primary" type="submit" fullWidth size="large" disabled={loading}>
                        Sign Up
                    </Button>
                </form>
            </Paper>
            <Typography variant="body1">
                <Link component={RouterLink} to="/login">
                    Already have an account? Log In
                </Link>
            </Typography>
            <Snackbar autoHideDuration={4000} onClose={handleSnackbarClose} open={openSnackbar}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    <Typography>{error}</Typography>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Signup;

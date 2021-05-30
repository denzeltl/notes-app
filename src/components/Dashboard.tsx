import React, { useState } from "react";
import { makeStyles, Button, Typography, Paper, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

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
    user: {
        marginBottom: "1rem",
    },
}));

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const classes = useStyles();
    const { currentUser, logout }: any = useAuth();
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

    async function handleLogout() {
        setError("");

        try {
            setLoading(true);
            await logout();
            history.push("/login");
        } catch {
            setOpenSnackbar(true);
            setError("Failed to log out");
        }

        setLoading(false);
    }

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.title}>
                    Profile
                </Typography>
                <Typography variant="body1" className={classes.user}>
                    Email: {currentUser.email}
                </Typography>
                <Button variant="contained" color="primary" type="submit" fullWidth size="large" disabled={loading} onClick={handleLogout}>
                    Log Out
                </Button>
            </Paper>
            <Snackbar autoHideDuration={4000} onClose={handleSnackbarClose} open={openSnackbar}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    <Typography>{error}</Typography>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Dashboard;

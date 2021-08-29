import React, { useState } from "react";
import { Grid, makeStyles, Typography, IconButton, InputBase, Popper, Paper, Button, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { AccountCircle as AccountCircleIcon, ArrowDropDown as ArrowDropDownIcon, Search as SearchIcon } from "@material-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "1rem 2rem",
        background: "#fff",
        [theme.breakpoints.down("xl")]: {},
    },
    searchNotesContainer: {
        maxWidth: "25rem",
        width: "100%",
        border: "1px solid #ccc",
        padding: "0 0.5rem",
        borderRadius: "4px",
    },
    accountContainer: {
        width: "auto",
    },
    welcomeHeading: {
        marginRight: "1rem",
    },
    arrowIcon: {
        marginLeft: "-3px",
    },
    paper: {
        padding: "1.5rem",
    },
    accountTitle: {
        marginBottom: "0.8rem",
        textAlign: "center",
    },
    accountUser: {
        marginBottom: "0.8rem",
        textAlign: "center",
    },
}));

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const classes = useStyles();
    const { currentUser, currentUserName, logout }: any = useAuth();
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [accountEl, setAccountEl] = React.useState<null | HTMLElement>(null);
    const openAccount = Boolean(accountEl);
    const account = openAccount ? "simple-popper" : undefined;

    const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
        setAccountEl(accountEl ? null : event.currentTarget);
    };

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
            <Grid container justify="space-between" alignItems="center">
                <Grid container spacing={1} alignItems="flex-end" className={classes.searchNotesContainer}>
                    <Grid item>
                        <SearchIcon />
                    </Grid>
                    <Grid item xs={10}>
                        <InputBase placeholder="Search notes" fullWidth />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" item className={classes.accountContainer}>
                    <Typography variant="h6" component="h2" className={classes.welcomeHeading}>
                        Welcome, {currentUserName}!
                    </Typography>
                    <IconButton aria-describedby={account} edge="start" size="small" onClick={handleAccountClick}>
                        <AccountCircleIcon fontSize="large" />
                        <ArrowDropDownIcon className={classes.arrowIcon} />
                    </IconButton>
                    <Popper id={account} open={openAccount} anchorEl={accountEl}>
                        <Paper elevation={2} className={classes.paper}>
                            <Typography variant="h6" component="h3" className={classes.accountTitle}>
                                Account
                            </Typography>
                            <Typography variant="body1" className={classes.accountUser}>
                                Email: {currentUser.email}
                            </Typography>
                            <Button variant="contained" color="primary" type="submit" fullWidth size="large" disabled={loading} onClick={handleLogout}>
                                Log Out
                            </Button>
                        </Paper>
                    </Popper>
                </Grid>
            </Grid>
            <Snackbar autoHideDuration={4000} onClose={handleSnackbarClose} open={openSnackbar}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    <Typography>{error}</Typography>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Navbar;

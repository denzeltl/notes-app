import React from "react";
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";
import { Email as EmailIcon, Lock as LockIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xl")]: {},
    },
}));

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <EmailIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="email-input" label="Email Address" type="email" helperText="Feel free to input a dummy email, I don't collect emails!" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="password-input" label="Password" type="password" autoComplete="current-password" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="confirm-password-input" label="Confirm Password" type="password" autoComplete="current-password" />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Signup;

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'
import { setUserSession } from './Utils/Common';

import { Link, withRouter } from "react-router-dom";
import forgotPwdImg from "../public/static/images/forgotpassword.svg";
import CustomAlert from './Alert';
const useStyles = makeStyles({
    grid: {
        padding: '30px 0',
    },
    form: {
        padding: 20
    },
    title: {
        fontSize: 14,
    },
    textBox: {
        width: '100%',
        marginBottom: 20
    },
    alignRight: {
        flexDirection: 'row-reverse'
    },
    alignCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    textBoxPassword:{
        width: '100%',
        marginBottom: 0
    },
    marginBottom20:{        
        marginBottom: 20
    },
    smallText:{
        fontSize:12
    }
});

function ForgotPassword(props) {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const handleReset = () => {
        setLoading(true);
        setError(null);
        if (email === "") {
            setError((prevErr) => ({ ...prevErr, email: "enter the email" }));
            setLoading(false);
        }
        
        var mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email!=="" && !mailFormat.test(email)) {
            setError((prevErr) => ({ ...prevErr, email: "enter valid email" }));
            setLoading(false);            
        }

        
        
        if (email !== "" && !mailFormat.test(email)) {
            //Db interaction
            fetch("https://productivity.pratyush93.repl.co/resetpassword", {
                method: "POST",
                body: JSON.stringify({ email: email }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cors: "no-cors"
            })
                .then(response => response.json())
                .then(jsonResponse => {
                    setLoading(false);
                    if (!jsonResponse.error) {
                        setError((prevErr) => ({ ...prevErr, info: "If the email matches the database, you will receive a reset password link" }));
                    }
                    else
                        setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                });
         }
    }

    const handleEmail = (event) => {
        setError((prevErr) => ({ ...prevErr, email: "" }))
        setEmail(event.target.value);
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.grid}
        >
            <div className="glass">
                <CardMedia
                    className={classes.media}
                    image={forgotPwdImg}
                />
                <CardContent>
                    <FormControl className={classes.form} required>
                        <TextField id="fp_email"
                            size="small"
                            value={email}
                            onChange={handleEmail}
                            className={classes.textBox}
                            label="email"
                            variant="outlined"
                            type="email"
                            required
                            error={error && error.email ? true : false}
                            helperText={error && error.email}
                        />
                        <Button variant="outlined"
                            color="primary"
                            className={classes.marginBottom20}
                            endIcon={
                                loading ?
                                    <CircularProgress
                                        variant="indeterminate"
                                        disableShrink
                                        size={20}
                                        thickness={4}
                                    /> : <Icon>arrow_forward</Icon>}
                            onClick={handleReset} disabled={loading} >
                            {loading ? 'Loading...' : 'Reset'}
                        </Button>
                        <Typography className={classes.smallText}>Go back to
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button color="primary" className={classes.smallText}>Login</Button>
                            </Link>
                        </Typography>
                    </FormControl>
                </CardContent>
            </div>
            {error && error.message ? <CustomAlert message={error.message} open={true} severity="error"/> : null}
            {error && error.info ? <CustomAlert message={error.info} open={true} severity="info"/> : null}
        </Grid>
    );
}

export default withRouter(ForgotPassword);

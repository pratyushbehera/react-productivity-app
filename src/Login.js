import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setUserSession } from './Utils/Common';

import { Link, withRouter } from "react-router-dom";
import loginImg from "../public/static/images/login.svg";
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
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

function Login(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleLogin = () => {
        setLoading(true);
        setError(null);
        if (userName === "") {
            setError((prevErr) => ({ ...prevErr, userName: "enter the username" }));
            setLoading(false);
        }
        if (password === "") {
            setError((prevErr) => ({ ...prevErr, password: "enter the password" }));
            setLoading(false);
        }
        if (userName !== "" && password !== "") {
            //Db interaction
            fetch("https://productivity.pratyush93.repl.co/login", {
                method: "POST",
                body: JSON.stringify({ userName: userName, password: password }),
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
                        setUserSession(jsonResponse.token, jsonResponse.user);
                        props.handleUser(jsonResponse.user);
                        props.history.push({ pathname: '/dashboard', state: { user: jsonResponse.user } });
                    }
                    else
                        setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                });
        }
    }

    const handleUserName = (event) => {
        setError((prevErr) => ({ ...prevErr, userName: "" }))
        setUserName(event.target.value);
    }
    const handlePassword = (event) => {
        setError((prevErr) => ({ ...prevErr, password: "" }))
        setPassword(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13)
            handleLogin()
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.grid}
        >

            <div className="glass">
                <CardMedia
                    className={classes.media}
                    image={loginImg}
                />
                <CardContent>
                    <FormControl className={classes.form} required>
                        <TextField id="userName"
                            size="small"
                            value={userName}
                            onChange={handleUserName}
                            className={classes.textBox}
                            label="Username"
                            variant="outlined"
                            required
                            error={error && error.userName ? true : false}
                            helperText={error && error.userName}
                        />
                        <TextField id="password"
                            size="small"
                            value={password}
                            onKeyPress={handleKeyPress}
                            onChange={handlePassword}
                            type="password"
                            className={classes.textBox}
                            label="Password"
                            variant="outlined"
                            autoComplete="current-password"
                            required
                            error={error && error.password ? true : false}
                            helperText={error && error.password} />
                        <Button variant="outlined"
                            color="primary"
                            endIcon={
                                loading ?
                                    <CircularProgress
                                        variant="indeterminate"
                                        disableShrink
                                        size={20}
                                        thickness={4}
                                    /> : <Icon>arrow_forward</Icon>}
                            onClick={handleLogin} disabled={loading} >
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </FormControl>
                    <Grid container>
                        <Grid item xs={6}>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Button color="primary">Register</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
                                <Button color="secondary">Forgot Password ?</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </div>
            {error && error.message ? <CustomAlert message={error.message} open={true} severity="error" /> : null}
            {props.location.state && props.location.state.info ? <CustomAlert message={props.location.state.info} open={true} severity="success" /> : null}
        </Grid>
    );
}

export default withRouter(Login);

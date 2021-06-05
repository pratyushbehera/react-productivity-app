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
import registerImg from "../public/static/images/register.svg";
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

function Register(props) {

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const handleRegister = () => {
        setLoading(true);
        setError(null);
        if (email === "") {
            setError((prevErr) => ({ ...prevErr, email: "enter the email" }));
            setLoading(false);
        }
        if (userName === "") {
            setError((prevErr) => ({ ...prevErr, userName: "enter the username" }));
            setLoading(false);
        }
        if (password === "") {
            setError((prevErr) => ({ ...prevErr, password: "enter the password" }));
            setLoading(false);
        }
        var mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email!=="" && !mailFormat.test(email)) {
            setError((prevErr) => ({ ...prevErr, email: "enter valid email" }));
            setLoading(false);            
        }
        
        var passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (password!=="" && !passwordFormat.test(password)) {
            setError((prevErr) => ({ ...prevErr, password: <span>must contain at least one number and<br/> one uppercase and lowercase letter,<br/> and at least 8 or more characters</span> }));
            setLoading(false);            
        }
        
        
        if (userName !== "" && email !== "" && password !=="" && !passwordFormat.test(password) && !mailFormat.test(email)) {
            //Db interaction
            fetch("https://productivity.pratyush93.repl.co/register", {
                method: "POST",
                body: JSON.stringify({ userName: userName, email: email, password: password }),
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
                        props.history.push({pathname:'/login' , state: { info : jsonResponse.message}});
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

    const handleUserName = (event) => {
        setError((prevErr) => ({ ...prevErr, userName: "" }))
        setUserName(event.target.value);
    }
    const handlePassword = (event) => {
        let pwd = event.target.value
        setError((prevErr) => ({ ...prevErr, password: "" }))
        setPassword(pwd);
        setPasswordStrength(0);
        if(pwd.length>= 8){
            setPasswordStrength(prev=> prev +25)
        }
        if(pwd.match(/[A-Z]/) !== null){
            setPasswordStrength(prev=> prev +25)
        }
        
        if(pwd.match(/[a-z]/) !== null){
            setPasswordStrength(prev=> prev +25)
        }
        if(pwd.match(/\d/) !== null){
            setPasswordStrength(prev=> prev +25)
        }
        if(pwd.match(/[^\w\s]/) !== null){
            setPasswordStrength(prev=> prev +25)
        }
    }

    const checkEmailExist = () => {
        setError(null);
        let mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email!=="" && mailFormat.test(email)) {
            fetch(`https://productivity.pratyush93.repl.co/CheckEmailExists?email=${email}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cors: "no-cors"
            })
                .then(response => response.json())
                .then(jsonResponse => {
                    if (jsonResponse.error) {
                        setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                        setEmail("");
                    }
                });          
        }
    }

    const checkUserNameExist = () => {
        setError(null);
        if (userName!=="") {
            fetch(`https://productivity.pratyush93.repl.co/CheckUserNameExists?userName=${userName}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cors: "no-cors"
            })
                .then(response => response.json())
                .then(jsonResponse => {
                    if (jsonResponse.error) {
                        setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                        setUserName("");
                    }
                });          
        }
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
                    image={registerImg}
                />
                <CardContent>
                    <FormControl className={classes.form} required>
                        <TextField id="reg_email"
                            size="small"
                            value={email}
                            onChange={handleEmail}
                            onBlur={checkEmailExist}
                            className={classes.textBox}
                            label="email"
                            variant="outlined"
                            type="email"
                            required
                            error={error && error.email ? true : false}
                            helperText={error && error.email}
                        />
                        <TextField id="reg_userName"
                            size="small"
                            value={userName}
                            onChange={handleUserName}
                            onBlur={checkUserNameExist}
                            className={classes.textBox}
                            label="Username"
                            variant="outlined"
                            required
                            error={error && error.userName ? true : false}
                            helperText={error && error.userName}
                        />
                        
                        <TextField id="reg_password"
                            size="small"
                            value={password}
                            onChange={handlePassword}
                            type="password"
                            className={classes.textBoxPassword}
                            label="Password"
                            variant="outlined"
                            autoComplete="new-password"
                            required
                            error={error && error.password ? true : false}
                            helperText={error && error.password} />
                            
                        <LinearProgress className={classes.textBox} variant="determinate" value={passwordStrength} />
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
                            onClick={handleRegister} disabled={loading} >
                            {loading ? 'Loading...' : 'Register'}
                        </Button>
                        <Typography className={classes.smallText}>Already registered?
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button color="primary" className={classes.smallText}>Login</Button>
                            </Link>
                        </Typography>
                    </FormControl>
                </CardContent>
            </div>
            {error && error.message ? <CustomAlert message={error.message} open={true} severity="error"/> : null}
        </Grid>
    );
}

export default withRouter(Register);

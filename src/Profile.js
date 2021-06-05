import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';



const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        padding: 20
    },
    media: {
        width: 200,
        height: 200,
        borderRadius: '50%'
    },
});
const Profile = (props) => {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Hidden smDown>
                <Grid item md={3}></Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={6}>
                <div className={classes.root + " glass"}>
                    <CardMedia
                        className={classes.media}
                        image="/public/static/images/login.svg"
                    />
                    <CardContent>
                        <FormControl className={classes.form} >
                        {/* <form className={classes.form} noValidate autoComplete="off"> */}
                            <TextField id="name" label="Name" value="FirstName LastName"/>
                            <TextField id="username" label="Username" disabled value={"@"+props.user.userName}/>
                            <TextField id="email" label="Email" disabled value={""+props.user.email}/>
                        {/* </form> */}
                        </FormControl>
                        <Typography gutterBottom variant="h5" component="h2">
                            
                            </Typography>

                    </CardContent>

                </div>
            </Grid>
        </Grid>

    );
}

export default Profile
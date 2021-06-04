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

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
                <Grid item md={2}></Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8}>
                <div className={classes.root + " glass"}>
                        <CardMedia
                            className={classes.media}
                            image="/public/static/images/login.svg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                FirstName LastName
                            </Typography>

                        </CardContent>
                   
                </div>
            </Grid>
        </Grid>

    );
}

export default Profile
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    gridAlignCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
    smallText: {
        fontSize: '12px'
    }
}));

const WelcomePanel = (props) => {
    let taskCount = props.task ? props.task.length : 0;
    let unfinishedCount = props.task ? props.task.filter(item=>!item.completed).length : 0;
    const classes = useStyles();
    return (
        <div className={classes.root + " glass"}>
            <Typography variant="h5" component="h2">
                Welcome {props.user && props.user.userName || "Stranger"},
        </Typography>
            <Typography variant="subtitle2">
                Overall Stats
        </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6} className={classes.gridAlignCenter}>
                    <div className="progress">
                        <Typography variant="h4" color="primary">
                            {taskCount}
                        </Typography>
                        <Typography className={classes.smallText}>
                            Task(s)
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} className={classes.gridAlignCenter}>
                    <div className="progress">
                        <Typography variant="h4" color="primary">
                            {unfinishedCount}
                        </Typography>
                        <Typography className={classes.smallText}>
                            Unfinished Task(s)
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

WelcomePanel.prototype = {
    user: PropTypes.object
}

export default WelcomePanel;
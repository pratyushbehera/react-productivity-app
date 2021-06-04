import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TaskList from './TaskList';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link, withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '75vh',
        padding: theme.spacing(2),
    },
    taskList: {
        marginTop: 5,
        height: '65vh',
        overflow: 'hidden',
        overflowY: 'scroll'
    },
    fab: {
        backgroundColor: '#43a047',
        '&:hover': {
            backgroundColor: '#43a747',
        },
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const TaskApp = (props) => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const handleAddNew = (path) => {
        props.history.push(path);
    }

    return (
        <>
            <div className={classes.root + " glass"}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Tasks
                </Typography>
                {props.task === null ? <div>Loading...</div> : null}
                <div className={classes.taskList + " scroll"}>
                    {
                        props.task && <TaskList tasks={props.task} DeleteTask={props.delete} DoneTask={props.done} />
                    }
                </div>
                <Fab className={classes.fab} color="secondary" aria-label="add" onClick={() => handleAddNew('/tasks')}>
                    <CreateIcon />
                </Fab>
            </div>
        </>
    )
}

export default withRouter(TaskApp);
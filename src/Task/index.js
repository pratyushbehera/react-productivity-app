import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskList from './TaskList';
import TaskHeader from './TaskHeader';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
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
    rightAlign: {
        float: 'right'
    },
    fab: {
        backgroundColor: '#43a047',
        '&:hover': {
            backgroundColor: '#43a747',
        },
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    flexCenter:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const TaskApp = (props) => {
    const classes = useStyles();
    const handleAddNew = (path) => {
        props.history.push(path);
    }

    return (
        <>
            <div className={classes.root + " glass"}>
                <TaskHeader toggleDisplayCompleted={props.toggleDisplayCompleted} 
                displayCompleted={props.displayCompleted} filterText={props.filterText} 
                handleFilterText={props.handleFilterText}/>
                {props.task === null ? <Typography className={classes.flexCenter}>Loading...</Typography> :
                    <div className={classes.taskList + " scroll"}>
                        {
                            props.task && <TaskList tasks={props.task} DeleteTask={props.delete}
                                DoneTask={props.done} displayCompleted={props.displayCompleted} 
                                filterText={props.filterText} />
                        }
                    </div>
                }
                <Fab className={classes.fab} color="secondary" aria-label="add" onClick={() => handleAddNew('/tasks')}>
                    <CreateIcon />
                </Fab>
            </div>
        </>
    )
}

export default withRouter(TaskApp);
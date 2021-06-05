import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSubheader from '@material-ui/core/ListSubheader';
import ColoredCheckbox from '../ColoredCheckbox';

const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: 10,
    },
    flexCenter:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));



export default function TaskList(props) {
    const classes = useStyles();
    const tasks = props.tasks && props.displayCompleted ? props.tasks : props.tasks.filter(item=>!item.completed && (item.title.indexOf(props.filterText)> -1 || item.details.indexOf(props.filterText)> -1));
    const dateArr = tasks &&  tasks.map(item => new Date(item.created).toLocaleDateString())
    let distinctDate = dateArr.filter((data, index) => {
        return dateArr.indexOf(data) === index;
    });
    if(distinctDate.length > 1)
    distinctDate = distinctDate.sort((a,b) => new Date(a) > new Date(b));
    
    const dateWiseTask = distinctDate.map(date => tasks && tasks.filter(item => new Date(item.created).toLocaleDateString() === date));
if(tasks.length === 0){
    return <Typography className={classes.flexCenter}>No task found </Typography>
}
    return (
            <List>
                {
                    dateWiseTask.map((dateTask, index) => {


                        return (
                            <Fragment key={index}>
                                <ListSubheader color="primary" disableSticky>{distinctDate[index]}</ListSubheader>
                                {dateTask.map(item => (
                                    <ListItem key={item._id} role={undefined} dense button >
                                        <ListItemIcon className={classes.listIcon}>
                                            <ColoredCheckbox
                                                edge="start"
                                                title={!item.completed ? "Mark as complete" : "Open task"}
                                                tabIndex={0}
                                                inputProps={{ 'aria-labelledby': 'task' }}
                                                checked={item.completed}
                                                onClick={() => props.DoneTask(item._id,!item.completed)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={item._id} className={item.completed? "completed":""} primary={item.title} secondary={item.details} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => props.DeleteTask(item._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}

                            </Fragment>
                        )
                    })
                }
            </List>
    );
}

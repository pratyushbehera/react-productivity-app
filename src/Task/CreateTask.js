import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import { withRouter } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';

import Alert from '../Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
    root: {
        padding: '30px',
        minHeight: '75vh'
    },
    form: {
        width: '100%'
    },
    textBox: {
        marginBottom: 20
    }
});


const CreateTask = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDetails, setTaskDetails] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTitleChange = (event) => {
        setTaskTitle(event.target.value)
    }

    const handleDetailChange = (event) => {
        setTaskDetails(event.target.value)
    }

    const saveTask = () => {
        setLoading(true);
        setError(null);
        if (taskTitle === "") {
            setError((prevErr) => ({ ...prevErr, title: "enter the title" }));
            setLoading(false);
        }
        if (taskDetails === "") {
            setError((prevErr) => ({ ...prevErr, details: "enter the details" }));
            setLoading(false);
        }
        if (selectedDate instanceof Date && taskDetails !== "" && taskTitle !== "") {

            fetch("https://productivity.pratyush93.repl.co/createTask", {
                method: "POST",
                body: JSON.stringify({
                    createdBy: props.user.userName, title: taskTitle,
                    details: taskDetails, created: selectedDate
                }),
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
                        setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                        props.history.push('/dashboard');
                    }
                    else
                        setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                });

        }
    }

    const classes = useStyles()
    return (
        <Grid container spacing={3}>
            <Hidden smDown>
                <Grid item md={2}></Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8}>
                <div className={classes.root + " glass"}>
                    <Typography className={classes.header} variant="h6" component="h2">
                        Create Task
                    </Typography>
                    <FormControl className={classes.form} required>
                        <TextField id="task-title" label="Task title"
                            className={classes.textBox}
                            value={taskTitle}
                            onChange={handleTitleChange}
                            error={error && error.title ? true : false}
                            helperText={error && error.title}
                        />
                        <TextField
                            id="task-details"
                            label="Task details"
                            className={classes.textBox}
                            multiline
                            rows={4}
                            value={taskDetails}
                            onChange={handleDetailChange}
                            error={error && error.details ? true : false}
                            helperText={error && error.details}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                className={classes.textBox}
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="task-date"
                                label="Task date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="task-time"
                                label="Task time"
                                value={selectedDate}
                                className={classes.textBox}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <Button variant="contained" onClick={saveTask}
                            disabled={loading}
                            startIcon={!loading ? <Icon>save</Icon> : null}
                            endIcon={
                                loading ?
                                    <CircularProgress
                                        variant="indeterminate"
                                        disableShrink
                                        size={20}
                                        thickness={4}
                                    /> : null}>
                            {!loading ? "Save" : "Saving..."}
                        </Button>
                    </FormControl>
                </div>
                {error && error.message ? <Alert message={error.message} open={true} /> : null}
            </Grid>
        </Grid>
    )
}

export default withRouter(CreateTask);
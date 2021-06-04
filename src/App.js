import React, { useState, useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

import NavBar from './Nav';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Notes from './Notes';
import Profile from './Profile';
import CustomAlert from './Alert';
import { getUser, getToken, removeUserSession, setUserSession } from './Utils/Common';
import CreateTask from './Task/CreateTask';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
    const [user, setUser] = useState({});
    const [authLoading, setAuthLoading] = useState(false);
    useEffect(() => {
        const token = getToken();

        if (!token) {
            return null;
        }

        fetch(`https://productivity.pratyush93.repl.co/verifyToken?token=${token}`
            , {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cors: "no-cors"
            })
            .then(response => response.json())
            .then(jsonResponse => {
                setAuthLoading(false);
                setUser(jsonResponse.user);
                setUserSession(jsonResponse.token, jsonResponse.user);
            }).catch(error => {
                setError((prevErr) => ({ ...prevErr, message: error.toString() }));
                removeUserSession();
                setAuthLoading(false);
            });
    }, []);



    const [taskList, setTaskList] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`https://productivity.pratyush93.repl.co/getTask?userName=${user.userName}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cors: "no-cors"
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.error) {
                    setTaskList(jsonResponse.task)
                }
                else
                    setTaskList(null);
            });
    }, [user]);


    const deleteTask = (id) => {
        setError(null);
        let newTaskList = taskList.filter(item => item._id !== id);
        setTaskList(newTaskList);
        fetch("https://productivity.pratyush93.repl.co/deleteTaskById", {
            method: "DELETE",
            body: JSON.stringify({ taskId: id }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cors: "no-cors"
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.error) {
                    setError((prevErr) => ({ ...prevErr, message: "Task deletion succesful" }));
                }
                else {
                    setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                    setTaskList(taskList);
                }
            });
    }

    const doneTask = (id, completed) => {
        setError(null);
        let newTaskList = taskList.filter(item => item._id !== id);
        let currentTask = taskList.filter(item => item._id === id);
        currentTask[0].completed = completed;
        //setTaskList([...newTaskList, ...currentTask]);
        fetch("https://productivity.pratyush93.repl.co/completeTaskById", {
            method: "PUT",
            body: JSON.stringify({ taskId: id, completed: completed }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cors: "no-cors"
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.error) {
                    setError((prevErr) => ({ ...prevErr, message: completed ? "Task marked as complete" : "Task marked as open" }));
                }
                else {
                    setError((prevErr) => ({ ...prevErr, message: jsonResponse.message }));
                    setTaskList(taskList);
                }
            });
    }

    if (authLoading && getToken()) {
        return <div className="content"><CircularProgress color="secondary" size={10} /> </div>
    }

    return (
        <ThemeProvider>
            <Router history={history}>
                <NavBar user={user} />
                <Layout>
                    <Switch>
                        < Route exact path="/about" >
                            <div>Hello</div>
                        </Route>
                        <Route path="/dashboard"
                            render={(props) => getToken() ? <Dashboard {...props} user={user}
                                task={taskList} done={doneTask} delete={deleteTask} /> : <Redirect to={{ pathname: '/login' }} />}
                        />
                        <Route path="/notes"
                            render={(props) => getToken() ? <Notes {...props} user={user} /> : <Redirect to={{ pathname: '/login' }} />}
                        />
                        <Route path="/profile"
                            render={(props) => getToken() ? <Profile {...props} user={user} /> : <Redirect to={{ pathname: '/login' }} />}
                        />
                        <Route path="/tasks"
                            render={(props) => getToken() ? <CreateTask {...props} user={user} /> : <Redirect to={{ pathname: '/login' }} />}
                        />
                        <Route path="/register"
                            render={(props) => !getToken() ? <Register {...props} user={user} /> : <Redirect to={{ pathname: '/dashboard' }} />}
                        />
                        <Route path="/forgotpassword"
                            render={(props) => !getToken() ? <Register {...props} user={user} /> : <Redirect to={{ pathname: '/dashboard' }} />}
                        />
                        <Route path="/"
                            render={(props) => !getToken() ? <Login {...props} user={user} handleUser={setUser} /> : <Redirect to={{ pathname: '/dashboard' }} />}
                        />
                    </Switch>

                    {error && error.message ? <CustomAlert message={error.message} open={true} severity="info" /> : null}
                </Layout>

            </Router>
        </ThemeProvider>
    );
};

export default App;


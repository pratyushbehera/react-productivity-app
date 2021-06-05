import React from 'react'
import WelcomePanel from './welcome'
import TaskApp from './Task';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
const Dashboard = (props) => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
                <WelcomePanel user={props.user} task={props.task} />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <TaskApp user={props.user} task={props.task} done={props.done} delete={props.delete}
                displayCompleted={props.displayCompleted} toggleDisplayCompleted={props.toggleDisplayCompleted}
                filterText={props.filterText} handleFilterText={props.handleFilterText} />
            </Grid>
        </Grid>
    );
}

export default withRouter(Dashboard);
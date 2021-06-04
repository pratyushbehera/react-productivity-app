import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';

const Notes = (props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <div className="glass">
                    HEllo
                </div>
            </Grid>           
        </Grid>
    )
}

export default Notes;
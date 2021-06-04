import React from 'react';
import Heatmap from "react-simple-heatmap";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        padding: '30px',
        marginTop: '30px',
        minHeight: '40vh'
    }
});
export default function ActivyGraph() {
    const classes = useStyles()
    const data = [
        [1, 0, 3, 0, 1, 1, 1],
        [2, 4, 3, 0, 3, 0, 1],
        [1, 3, 2, 0, 1, 2, 1],
        [2, 4, 3, 0, 3, 0, 1],
        [2, 4,],
    ];
    return (
        <div className={classes.root + " glass"}>
            <div
                style={{ height: '40vh', width: "100%" }}>
                <Heatmap data={data}
                title={["1"]}
                    bgColors={["rgb(75,177,126)", "rgb(117,122,120)"]}
                    yLabels={["SUN","SAT","FRI","THU","WED","TUE","MON"]}
                    xLabels={["1","2"]}
                    showLegend={false}
                    xLabelsStyle={{ fontWeight: "bold", fontSize: "11px" }}
                    yLabelsStyle={{ fontWeight: "bold" }}
                    bordered={true}
                    borderRadius={"4px"} />
            </div>
        </div>
    )
}




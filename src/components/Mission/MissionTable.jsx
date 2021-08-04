
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Style with Material UI 
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



function MissionTable() {

    // Material UI classes 
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    // Get the Missions information from the reducer so we can render it
    const mission = useSelector(store => store.mission);

    // Upon page load, this function dispatches "fetch missions" command to the generator function 
    useEffect(() => {
        dispatch({ type: 'FETCH_MISSIONS' })
    }, []);

console.log(mission);
    return (
        <div>
            <h2>Upcoming Missions</h2>

        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Organization</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
             
                {/*Takes the Mission Data from the Reducer */}
                <TableBody>
                    {mission.map((mission) => (
                        <TableRow key={mission.name}>
                            <TableCell><a href={mission.missionLink} target="_blank">{mission.location}</a></TableCell>
                            <TableCell>{mission.startDate}</TableCell>
                            <TableCell>{mission.endDate}</TableCell>
                            <TableCell>{mission.name}</TableCell>
                            <TableCell>
                                <a href={mission.applyLink}
                                    target="_blank"
                                    >
                                    Apply</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
} // end Mission Table

export default MissionTable;


// ## Checklist

// - [ ]  Mission Table
//     - [x]  Missions are organized by date with the most current mission at the top (use-effect that sorts by date GET route)
//     - [ ]  Sort-by feature to organize table data (stretch)
// - [ ]  Table Columns
//     - [x]  Date
//     - [x]  Location
//         - [x]  Location links to information on the location (travel info, possible wikipedia link? maybe something else that looks cleaner)
//     - [x]  Organization
//     - [x]  Pseudo column that will have the apply button

//     # Component(s)

//     - [x]  Missions Table
//     - [x]  I'm Interested Button
//         - [x]  Will link to [mmi.org/projects-usd](http://mmi.org/projects-usd) for the provider to be able to apply to selected mission

//         # Route(s)

//         - [x]  GET
//             - [x]  Missions Table
